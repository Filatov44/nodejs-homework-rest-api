
// Импортируем модель
const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    // если в .find передать пустой обьект он повернет все с коллекции
    // если передать так: .find({}, "name email") вернет только эти поля
    // если передать так: .find({}, "-name -email") вернет все кроме этих полей
    console.log(Contact);
    const result = await Contact.find({});
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
   
  }
};

module.exports = getAll;