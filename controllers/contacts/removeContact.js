// Импортируем модель
const Contact = require("../../models/contact");

const { httpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw httpError(400, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
