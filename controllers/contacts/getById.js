const contacts = require("../../models/contacts");
const { httpError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    // все динамические части маршрута сохраняются в req.params
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    // если id не найдено нужно отправить 404 ошибку
    if (!result) {
      throw httpError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      //  return res.status(404).json({
      //     message: "Not found"
      //   })
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
