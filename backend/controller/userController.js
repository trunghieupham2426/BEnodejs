const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');
const multer = require('multer');
const { promisify } = require('util');

// ========photo====================

const multerStorage = multer.diskStorage({
  // cb = callback function , cung tuong tu nhu next() cua express
  destination: (req, file, cb) => {
    cb(null, 'public/images/userphoto');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`); //file photo se co dang : user-idUser-timeStamp.jpg
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
}); //dest = destination

exports.uploadUserPhoto = upload.single('photo');

// ================================= end photo=====================

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined; // ko gui pass cho user
  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      data: user,
    },
  });
};

exports.authHandler = catchError(async (req, res, next) => {
  let token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(new AppError("you're not login", 401));
  }

  // jwt.verify(token, 'SECRETKEY', function (err, decoded) {
  //   console.log(decoded);
  // });
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('this user no longer exist', 401));
  }
  req.user = currentUser;
  next();
});

exports.signUp = catchError(async (req, res, next) => {
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  newUser.password = undefined;
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.login = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('please provide email and password'), 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('invalid password or email', 401));
  }

  createSendToken(user, 200, res);
});

exports.updateMe = catchError(async (req, res, next) => {
  const userInfo = {
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
  };
  console.log(req.file);
  if (req.file) {
    userInfo.photo = req.file.filename;
  }

  const userUpdated = await User.findByIdAndUpdate(req.user.id, userInfo, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: userUpdated,
    },
  });
});
