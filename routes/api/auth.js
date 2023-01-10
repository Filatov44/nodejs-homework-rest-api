const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const ctrlAuth = require("../../controllers/auth");
const {
  validateBody, 
  authenticate,
  upload,
} = require("../../middlewares");

const schemas = require("../../schemas/users");

const router = express.Router();

// signup
router.post(
  "/signup",
  validateBody(schemas.joiRegisterSchema),
  ctrlWrapper(ctrlAuth.register)
);

// signin
router.post(
  "/login",
  validateBody(schemas.joiLoginSchema),
  ctrlWrapper(ctrlAuth.login));

// current
router.get("/current", authenticate, ctrlWrapper(ctrlAuth.getCurrent));

// logout
router.post("/logout", authenticate, ctrlWrapper(ctrlAuth.logout));

// avatar
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrlAuth.updateAvatar))

module.exports = router;