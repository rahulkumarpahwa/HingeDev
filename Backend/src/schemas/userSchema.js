const joi = require("joi");

const userSchema = joi.object({
  firstName: joi.string().required().min(4).max(50),
  lastName: joi.string().required().min(4).max(50),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: joi.string().required().min(8).max(32),
  dateOfBirth: joi.date().required(),
  gender: joi
    .string()
    .valid(
      "Woman",
      "Man",
      "Non-binary",
      "Trans-Woman",
      "Trans-Man",
      "Genderqueer",
      "Agender",
      "Genderfluid",
      "Prefer-not-to-say",
      "Other",
    )
    .required(),
});

module.exports = { userSchema };
