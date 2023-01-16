const User = require("../../models/user");
const { httpError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  // находим есть ли в базе человек с таким токеном
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw httpError(404, "Not found verification token");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
