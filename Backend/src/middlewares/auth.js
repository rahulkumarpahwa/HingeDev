const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const { env } = require("../../envParser.js");
const { responseError, errorConstants } = require("../utils/error.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ status: 401, success: false, message: "Bad Request, Please Login." });
    }

    const decodedToken = await jwt.verify(token, env.JWT_SECRET);
    const { _id, email } = decodedToken;
    const findUser = await User.findOne({ _id: _id, email: email });
    if (!findUser) {
      responseError(400, errorConstants.InvalidCredentails, "User not found");
    }

    req.user = findUser; // attaching the user in the request as we are already finding the user in the database and each request no need to find the user again in the request explicitly.
    next();
  } catch (error) {
    res.status(400).send(" error " + error.message);
  }
};

module.exports = { userAuth };
