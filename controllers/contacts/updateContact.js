const contacts = require("../../models/contacts");
const { httpError } = require("../../helpers");
const { JoiSchemaUpdate } = require("../../schemas/contacts");

const updateContact = async (req, res, next) => {
  try {
   
     const { error } = JoiSchemaUpdate.validate(req.body);
     if (error) {
       throw httpError(400, error.message);
     }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw httpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
