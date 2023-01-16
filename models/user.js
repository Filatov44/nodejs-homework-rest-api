const { model } = require("mongoose");

const { userSchema } = require("../schemas/usersForMongoose");
const { handleMongooseError } = require("../helpers");

// ловим ошибку в схеме
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
