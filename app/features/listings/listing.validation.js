const Joi = require("joi");

const createListingSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(255)
    .required(),
  latitude: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  longitude: Joi.number()
    .min(-180)
    .max(180)
    .required()
});

const updateListingSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(255),
  latitude: Joi.number()
    .min(-90)
    .max(90),
  longitude: Joi.number()
    .min(-180)
    .max(180)
});

const listingParamsSchema = Joi.object({
  id: Joi.number()
    .required()
});

const listingQuerySchema = Joi.object({
  page: Joi.number()
    .min(1),
  limit: Joi.number()
    .min(5),
  latitude: Joi.number()
    .min(-90)
    .max(90),
  longitude: Joi.number()
    .min(-180)
    .max(180)
});

module.exports = {
  createListingSchema,
  updateListingSchema,
  listingParamsSchema,
  listingQuerySchema
};