const jwt = require("jsonwebtoken");
const { jwt:jwt_env } = require("../../config/environment");

const { errorResponse } = require('../utils/functions/apiResponse');

const authorize = (req, res, next) => {
  const access_token = req.get("authorization");

  if (!access_token) {
    return errorResponse(res, "Unauthorized", 401);
  }

  try {
    const decodedToken = jwt.verify(access_token.split(" ")[1], jwt_env.secret_key);
    req.user = decodedToken;
    next();
  } catch (error) {
    return errorResponse(res, "Unauthorized", 401, error);
  }
};

module.exports = authorize;
