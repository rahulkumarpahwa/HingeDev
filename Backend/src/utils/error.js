const responseError = (status, errorname, message) => {
  const err = new Error(message, { cause: { status } });
  err.name = errorname;
  err.status = status;
  throw err;
};

const errorConstants = {
  ValidationError: "ValidationError",
  InvalidCredentails: "InvalidCredentails",
  UnauthorizedError: "UnauthorizedError",
};

module.exports = { responseError, errorConstants };
