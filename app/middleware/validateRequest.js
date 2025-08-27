const ApiError = require("../utils/classes/ApiError");

const validateRequest = (schemas) => {
  return (req, _, next) => {
    const validationError = [];
    for (const [target, schema] of Object.entries(schemas)) {
      const { error } = schema.validate(req[target] || {}, {
        abortEarly: false
      });
      if (error) {
        validationError.push(
          ...error.details.map((detail) => ({
            field: detail.context.label || detail.path.join("."),
            message: detail.message
          })) 
        );
        throw new ApiError(400, "Bad Request", validationError);
      }
    }
    next();
  }
}

module.exports = validateRequest;
