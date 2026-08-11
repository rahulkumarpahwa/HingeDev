const getUserIP = async (req, res, next) => {
  const ipRaw =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const ip = ipRaw.includes(":") ? ipRaw.replace(/^::ffff:/, "") : ipRaw;

  console.log("user ip", ip);
  if (ip) {
    req.userIP = ip;
  }
  next();
};

module.exports = { getUserIP };
