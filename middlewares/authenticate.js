const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { SECRET_KEY } = process.env;

const { httpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    // console.log(user);
    if (!user || !user.token === token) {
      next(httpError(401));
    }
    // записываем информацию кто делает запрос
    req.user = user;
    next();
  } catch (error) {
    next(httpError(401));
  }
};

module.exports = authenticate;
