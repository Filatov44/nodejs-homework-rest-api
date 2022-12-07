const express = require("express");

const contacts = require("../../models/contacts");

const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

// const { httpError } = require("../../helpers/httpError");
const { httpError } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({ result });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message: "Server error"
    // })
  }
});

router.get("/:contactId", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    // необходимо считать тело запроса, которое находится в req.body
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
 
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
