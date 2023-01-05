const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { httpError } = require("../../helpers");


const register = async (req, res) => {
    const { email, password} = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
    }
    // хэшуем пароль. 10- сложность соли(добавка при хэшировании для усложнения взлома)
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
   

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });
};

module.exports = register;