const express = require("express");

const ctrlContacts = require("../../controllers/contacts");

const {
  validateParams,
  validateBody,
  validateParamsForMangoose,
  authenticate,
} = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", authenticate, ctrlContacts.getAll);


router.get(
  "/:contactId",
  authenticate,
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  ctrlContacts.getById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.joiSchema),
  ctrlContacts.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  ctrlContacts.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  validateBody(schemas.JoiSchemaUpdate),
  ctrlContacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContacts.updateContact
);

module.exports = router;
