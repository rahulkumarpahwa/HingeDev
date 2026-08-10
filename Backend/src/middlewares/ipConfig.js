const { validateUserIP } = require("../utils/validation");

const getUserIP = async (req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  console.log("user ip", ip);

  const validIP = validateUserIP(ip);
  if (validIP) {
    req.userIP = validIP;
    next();
  } else {
    next(new Error("Invalid IP"));
  }
};

module.exports = { getUserIP };
