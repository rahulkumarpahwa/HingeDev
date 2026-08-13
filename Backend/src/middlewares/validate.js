const { responseError, errorConstants } = require("../utils/error");

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false, // return all validation errors together instead of single error.
      });
      req.body = validatedBody;
      next();
    } catch (e) {
      if (e.isJoi) {
        return res.status(400).json({
          error: "Validation Failed",
          details: e.details.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      // non joi error
      responseError(400, errorConstants.InternalServerError, e.message);
    }
  };
};

module.exports = { validateBody };
