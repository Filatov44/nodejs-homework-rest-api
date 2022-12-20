const express = require("express");

const ctrlContacts = require("../../controllers/contacts");

const { validateParams, validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlContacts.getAll);


router.get("/:contactId", validateParams, ctrlContacts.getById);

router.post("/", validateBody(schemas.joiSchema), ctrlContacts.addContact);

router.delete("/:contactId", validateParams, ctrlContacts.removeContact);

router.put(
  "/:contactId",
  validateParams,
  validateBody(schemas.JoiSchemaUpdate),
  ctrlContacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateParams,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContacts.updateStatusContact
);

module.exports = router;
