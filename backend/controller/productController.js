const Product = require('./../model/productModel');
const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  // cb = callback function , cung tuong tu nhu next() cua express
  destination: (req, file, cb) => {
    cb(null, 'public/images/productImg');
  },
  filename: (req, file, cb) => {
    //console.log(file);
    // console.log(file);
    const ext = file.mimetype.split('/')[1];
    // console.log(ext);

    cb(null, `product-${req.user.id}-${Date.now()}.${ext}`); //file photo se co dang :product-idUser-timeStamp.jpg (coi lai video 3 chuong 13)
  },
});

const multerFilter = (req, file, cb) => {
  //console.log(file);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('not an image , please upload only image', 400), false);
  }
};

// const upload = multer({ dest: 'public/img/users' }); //dest = destination
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.array('photo', 3);

exports.getMyProducts = catchError(async (req, res, next) => {
  const myProduct = await Product.find({
    seller: req.user.id,
  });
  if (myProduct.length === 0) {
    return next(new AppError('you dont have any product', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      products: myProduct,
    },
  });
});
exports.getAllProducts = catchError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    data: {
      products: products,
    },
  });
});

exports.getRandomProduct = catchError(async (req, res, next) => {
  const products = await Product.aggregate([
    {
      $match: { isActive: true },
    },
    {
      $sample: { size: 6 }, // de random document
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      products: products,
    },
  });
});
exports.getOneProduct = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      product: product,
    },
  });
});

exports.editMyProduct = catchError(async (req, res, next) => {
  const originalPhotos = req.body.originalPhotos.split(',');
  const deletePhotos = req.body.deletePhotos.split(',');
  const restOfPhotos = originalPhotos.filter(
    (photo) => !deletePhotos.includes(photo)
  );
  if (restOfPhotos.length + req.files?.length > 3) {
    return next(new AppError('maximum photo of 3', 400));
  }
  const productInfo = {
    ...req.body,
  };
  if (req.files?.length > 0) {
    productInfo.photo = [
      ...req.files.map((el) => el.filename),
      ...restOfPhotos,
    ];
  } else {
    productInfo.photo = [...restOfPhotos];
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    productInfo,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      updatedProduct: updatedProduct,
    },
  });
  // console.log(updatedProduct);
});

exports.deleteMyProduct = catchError(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createProduct = catchError(async (req, res, next) => {
  if (req.files?.length > 0) {
    req.body.photo = [...req.files.map((el) => el.filename)];
  }
  // console.log(req.files);
  const product = await Product.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: product,
    },
  });
});
