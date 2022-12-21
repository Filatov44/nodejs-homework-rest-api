const { httpError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const validateParamsForMangoose = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(httpError(404, "Invalid id"));
  }
  next();
};

module.exports = validateParamsForMangoose;
