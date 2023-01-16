const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { httpError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email invalid");
  }
  // .compare проверяет есть ли это хэшованным вариантом
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, "Password invalid");
  }

  if (!user.verify) {
    throw httpError(403, "Email not verify");
  }

  const payload = {
    id: user._id,
  };

  // если все ок создаем токен и возвращаем его
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

module.exports = login;
