const User = require("../../models/user");
const { httpError, sendEmail } = require("../../helpers");
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(404, "Not found");
  }
  if (user.verify) {
    throw httpError(400, "User already verify");
  }

  const mail = {
    to: email,
    subject: "Подтвердите регистрацию на сайте",
    html: `<a href="http://localhost:300/api/users/verify/${user.verificationToken}" target="_blank">Для подтверждения регистрации нажмите на ссылку</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Email verify resend",
  });
};

module.exports = resendVerifyEmail;
