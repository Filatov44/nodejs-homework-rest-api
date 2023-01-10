// Импортируем модель
const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    // параметры запроса находятся в req.query
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // если в .find передать пустой обьект он повернет все с коллекции
    // если передать так: .find({}, "name email") вернет только эти поля
    // если передать так: .find({}, "-name -email") вернет все кроме этих полей
    // console.log(Contact);
    // 3-им параметром в файнд можно передать обьект настроек. skip - сколько пропустить. limit - сколько взять
    // { skip: 2, limit: 2} означает что 1,2 прпущу, а возьму 3-4; populate- расширить запрос. Вставляет объект вместо ИД при гет запросе. 
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");
    // console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
