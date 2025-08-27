const Joi = require("joi");

const registerBodySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .label("Name")
    .required(),
  email: Joi.string()
    .email()
    .label("Email")
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .label("Password")
    .required()
    .messages({
      "string.pattern.base": "Password must have minimum 8 characters with at least 1 lowercase, uppercase, number, and special character."
    })
});

const loginBodySchema = Joi.object({
  email: Joi.string()
    .email()
    .label("Email")
    .required(),
  password: Joi.string()
    .label("Password")
    .required()
});

module.exports = {
  registerBodySchema,
  loginBodySchema
};