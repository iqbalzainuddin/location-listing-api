const successResponse = (
  res, 
  message = "success", 
  statusCode = 200,
  result
) => res.status(statusCode).json({
  status: statusCode,
  message,
  result
});

const errorResponse = (
  res,
  message = "Something went wrong",
  statusCode = 500,
  errors
) => res.status(statusCode).json({
  status: statusCode,
  message,
  errors
});

module.exports = {
  successResponse,
  errorResponse
};
