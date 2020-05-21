const mongoose = require('mongoose');

const { isCustomError, BadRequest } = require('../utils/errorResponses');

function errorHandler(err, req, res) {
  if (isCustomError(err)) 
    return res.status(err.statusCode).json({ success: false, message: err.message });

  let error = err;

  if (err instanceof mongoose.Error.CastError) 
    error = new BadRequest(`Resource ${err.stringValue} not found`);

  if (err instanceof mongoose.Error.ValidationError) 
    error = new BadRequest(Object.values(err.errors).map(val => val.message));

  if (err.code === 11000)
    error = new BadRequest('Duplicate field value entered');

  return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;

