const express = require("express");

const ctrlAuth = require("../../controllers/auth");
const {
//   validateParams,
  validateBody,
//   validateParamsForMangoose,
} = require("../../middlewares");

const schemas = require("../../schemas/users");

const router = express.Router();

// signup
router.post("/signup", validateBody(schemas.joiRegisterSchema), ctrlAuth.register);

module.exports = router;