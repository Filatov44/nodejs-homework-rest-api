const express = require("express");

const ctrlAuth = require("../../controllers/auth");
const {
//   validateParams,
  validateBody, 
  authenticate,
//   validateParamsForMangoose,
} = require("../../middlewares");

const schemas = require("../../schemas/users");

const router = express.Router();

// signup
router.post("/signup", validateBody(schemas.joiRegisterSchema), ctrlAuth.register);

// signin
router.post("/login", validateBody(schemas.joiLoginSchema), ctrlAuth.login);

// current
router.get("/current", authenticate, ctrlAuth.getCurrent);

// logout
router.post("/logout", authenticate, ctrlAuth.logout);

module.exports = router;