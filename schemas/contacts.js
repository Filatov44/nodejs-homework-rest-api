const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const JoiSchemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().integer(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const JoiSchemaParams = Joi.object({
  contactId: Joi.string().empty(),
});

module.exports = {
  joiSchema,
  JoiSchemaUpdate,
  JoiSchemaParams,
  updateFavoriteSchema,
};
