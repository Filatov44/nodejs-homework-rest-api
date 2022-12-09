const contacts = require("../../models/contacts");
const { httpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw httpError(400, "Not found");
    }
    res.json({ message: "contact deleted" });

    // если надо отправить статус 204, то тело ({ message: "Delite contact"}) не отправится. Пример ниже
    // res.json({ message: "Delite contact"})
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
