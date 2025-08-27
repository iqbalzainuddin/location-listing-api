const ApiError = require('../utils/classes/ApiError');

const checkAdminRole = (req, _, next) => {
  const { user } = req;
  
  if (!user) {
    throw new ApiError(401, "Unauthorized");    
  }

  if (user.role_type && user.role_type != "a") {
    throw new ApiError(403, "Forbidden");
  }

  next();
};

module.exports = checkAdminRole;
