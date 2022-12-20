// для работы без базы данных
// const contacts = require("../../models/contacts");

// Импортируем модель
const Contact = require("../../models/contact");


const addContact = async (req, res, next) => {
  try {
   
    // необходимо считать тело запроса, которое находится в req.body
    // const result = await contacts.addContact(req.body);
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;