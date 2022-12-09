const express = require("express");
// const { validate } = require("uuid");

const ctrlContacts = require("../../controllers/contacts");

// const contacts = require("../../models/contacts");

// const Joi = require("joi");

// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });


// const { httpError } = require("../../helpers");

const { validateParams, validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");


const router = express.Router();

router.get("/", ctrlContacts.getAll);

router.get("/:contactId", validateParams(schemas.JoiSchemaParams), ctrlContacts.getById);

router.post("/", validateBody(schemas.joiSchema), ctrlContacts.addContact);

router.delete(
  "/:contactId",
  validateParams(schemas.JoiSchemaParams),
  ctrlContacts.removeContact
);

router.put(
  "/:contactId",
  validateParams(schemas.JoiSchemaParams),
  validateBody(schemas.JoiSchemaUpdate),
  ctrlContacts.updateContact
);

module.exports = router;
