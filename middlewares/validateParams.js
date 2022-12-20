const { httpError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const validateParams = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(httpError(404, "Invalid id"));
  }
  next();
};

// const validateParams = (schema) => {
//   const func = (req, res, next) => {
//     const { error } = schema.validate(req.params);
//     console.log(req.params);
//     if (error) {
//       next(httpError(400, error.message));
//     }
//     next();
//   };

//   return func;
// };

module.exports = validateParams;


