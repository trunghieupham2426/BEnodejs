const AppError = require('./../utils/appError');

const errorHandler = (err, req, res) => {
  if (err.throwError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // nhung error khong biet o dau ra , hehe
  console.log('error');
  return res.status(500).json({
    status: 'error',
    message: 'Something went  wrong!',
    ErrorAt: err.stack,
    err: err,
  });
};

const handleDuplicateFieldsDB = (err) => {
  const message = `duplicate field value : '${err.keyValue.email}' please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  let message = err.message.split(':')[2].trim();
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  let error = { ...err, name: err.name, message: err.message };
  if (error.code === 11000) {
    error = handleDuplicateFieldsDB(error);
  }
  if (error.name === 'ValidationError') {
    error = handleValidationErrorDB(error);
  }
  errorHandler(error, req, res);
};
