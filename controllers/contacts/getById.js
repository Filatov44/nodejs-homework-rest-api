

// Импортируем модель
const Contact = require("../../models/contact");

const { httpError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    // все динамические части маршрута сохраняются в req.params
    const { contactId } = req.params;
    // Можно сделать так:    const result = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(contactId);
    
    if (!result) {
      throw httpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
