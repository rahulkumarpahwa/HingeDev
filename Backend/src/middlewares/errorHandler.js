const { env } = require("../../envParser");

const errorHandler = async (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  // todo : wrting the cutsom error for my system
  //   if (error.name === 'ValidationError') {
  //     status = 400
  //     message = 'Validation Error'
  //   }

    if (error.name === 'UnauthorizedError') {
      status = 401
      message = 'Unauthorized Error'
    }

  return res.status(status).json({
    error: message,
    ...(env.APP_STATE === "DEVLOPEMENT" && {
      stack: error.stack,
      details: error.message,
    }),
  });
};

module.exports = { errorHandler };
