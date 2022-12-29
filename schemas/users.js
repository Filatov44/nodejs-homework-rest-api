const Joi = require("joi");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const joiRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

module.exports = {
    joiRegisterSchema,
    joiLoginSchema
};