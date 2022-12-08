const contacts = require("../../models/contacts");
const { httpError } = require("../../helpers");
const { joiSchema } = require("../../schemas/contacts")

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    // необходимо считать тело запроса, которое находится в req.body
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;