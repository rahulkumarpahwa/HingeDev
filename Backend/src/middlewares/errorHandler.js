const { env } = require("../../envParser");

const errorHandler = async (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  if (error.name === "ValidationError") {
    status = 400;
    message = "invalid access";
  }

  if (error.name === "UnauthorizedError") {
    status = 401;
    message = "unauthorized access";
  }

  if (error.name === "InvalidCredentails") {
    status = 401;
    message = "invalid credentails";
  }

  console.log(`[${error.name}] : ${error.status} -- ${error.message}`)

  return res.status(status).json({
    error: message,
    timestamp: new Date().toISOString(),
    // ...(env.APP_STATE === "DEVLOPEMENT" && {
    //   stack: error.stack,
    //   details: error.message,
    // }),
  });
};

module.exports = { errorHandler };
