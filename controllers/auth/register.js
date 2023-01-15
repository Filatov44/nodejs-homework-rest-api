const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { httpError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  // хэшуем пароль. 10- сложность соли(добавка при хэшировании для усложнения взлома)
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  // send mail
  const mail = {
    to: email,
    subject: "Подтвердите регистрацию на сайте",
    html: `<a href="http://localhost:300/api/users/verify/${verificationToken}" target="_blank">Для подтверждения регистрации нажмите на ссылку</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
