const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const ctrlContacts = require("../../controllers/contacts");

const {
  validateParams,
  validateBody,
  validateParamsForMangoose,
} = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrlContacts.getAll));


router.get(
  "/:contactId",
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  ctrlWrapper(ctrlContacts.getById)
);

router.post(
  "/",
  validateBody(schemas.joiSchema),
  ctrlWrapper(ctrlContacts.addContact)
);

router.delete(
  "/:contactId",
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  ctrlWrapper(ctrlContacts.removeContact)
);

router.put(
  "/:contactId",
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  validateBody(schemas.JoiSchemaUpdate),
  ctrlWrapper(ctrlContacts.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateParams(schemas.JoiSchemaParams),
  validateParamsForMangoose,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrlContacts.updateContact)
);

module.exports = router;
