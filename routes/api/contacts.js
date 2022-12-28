const express = require("express");

const ctrlContacts = require("../../controllers/contacts");

const { validateParams, validateBody, validateParamsForMangoose } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlContacts.getAll);


router.get("/:contactId", validateParams(schemas.JoiSchemaParams), validateParamsForMangoose , ctrlContacts.getById);

router.post("/", validateBody(schemas.joiSchema), ctrlContacts.addContact);

router.delete(
  "/:contactId",
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  ctrlContacts.removeContact
);

router.put(
  "/:contactId",
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  validateBody(schemas.JoiSchemaUpdate),
  ctrlContacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContacts.updateContact
);

module.exports = router;
