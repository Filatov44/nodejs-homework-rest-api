const { model } = require("mongoose");
const { contactSchema } = require("../schemas/contactsForMongoose");
const { handleMongooseError } = require("../helpers");

// ловим ошибку в схеме
contactSchema.post("save", handleMongooseError);

// "contact" название коллекции к которой нужно подключиться, contactSchema - схема
const Contact = model("contact", contactSchema);

module.exports = Contact;