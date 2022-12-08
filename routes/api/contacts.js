const express = require("express");

const ctrlContacts = require("../../controllers/contacts");

// const contacts = require("../../models/contacts");

// const Joi = require("joi");

// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });


// const { httpError } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlContacts.getAll);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", ctrlContacts.addContact);

router.delete("/:contactId", ctrlContacts.removeContact);

router.put("/:contactId", ctrlContacts.updateContact);

module.exports = router;
