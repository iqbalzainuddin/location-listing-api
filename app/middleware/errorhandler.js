const { errorResponse } = require('../utils/functions/apiResponse');
const ApiError = require('../utils/classes/ApiError');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // If error is ApiError, use its status & message
  if (err instanceof ApiError) {
    return errorResponse(res, err.message, err.statusCode, err.errors);
  }

  // Otherwise, return generic 500
  return errorResponse(res, 'Internal Server Error', 500);
};

module.exports = errorHandler;
