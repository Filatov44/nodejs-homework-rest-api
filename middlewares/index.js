const validateParams = require("./validateParams");
const validateBody = require("./validateBody");
const validateParamsForMangoose = require("./validateParamsForMangoose");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateParams,
  validateBody,
  validateParamsForMangoose,
  authenticate,
  upload,
};
