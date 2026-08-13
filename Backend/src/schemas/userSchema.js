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

const loginSchema = joi.object({
  email: userSchema.extract("email").required(),
  password: userSchema.extract("password").required(),
  turnstileToken: joi.string().required(), // turnstile token
});

const updateSchema = joi.object({
  // Basic profile
  firstName: joi.string().trim().min(4).max(50).optional(),
  lastName: joi.string().trim().min(4).max(50).optional(),
  displayName: joi.string().trim().min(4).max(50).optional(),

  dateOfBirth: joi.date().optional(),

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
    .optional(),

  photoUrl: joi
    .string()
    .trim()
    .uri()
    .optional()
    .messages({
      "string.uri": "Invalid photo URL",
    }),

  bio: joi.string().trim().max(500).optional(),

  developerRole: joi
    .string()
    .valid(
      "frontend_developer",
      "backend_developer",
      "fullstack_developer",
      "mobile_developer",
      "devops_engineer",
      "data_engineer",
      "data_scientist",
      "ml_engineer",
      "ai_engineer",
      "security_engineer",
      "qa_engineer",
      "game_developer",
      "embedded_developer",
      "software_architect",
      "product_engineer",
      "student",
      "other",
    )
    .optional(),

  experienceLevel: joi
    .string()
    .valid("beginner", "intermediate", "advanced", "expert")
    .optional(),

  skills: joi
    .array()
    .items(joi.string().trim().min(1))
    .max(20)
    .optional(),

  interests: joi
    .array()
    .items(joi.string().trim().min(1))
    .optional(),

  city: joi.string().trim().min(1).optional(),
  state: joi.string().trim().min(1).optional(),
  country: joi.string().trim().min(1).optional(),
  timezone: joi.string().trim().min(1).optional(),

  location: joi
    .object({
      type: joi.string().valid("Point").required(),

      coordinates: joi
        .array()
        .items(joi.number().required())
        .length(2)
        .custom((value, helpers) => {
          const [longitude, latitude] = value;

          if (longitude < -180 || longitude > 180) {
            return helpers.error("any.invalid");
          }

          if (latitude < -90 || latitude > 90) {
            return helpers.error("any.invalid");
          }

          return value;
        })
        .messages({
          "any.invalid":
            "Coordinates must be [longitude, latitude] with longitude between -180 and 180 and latitude between -90 and 90",
        })
        .required(),
    })
    .optional(),

  github: joi
    .object({
      username: joi.string().trim().min(1).optional(),

      profileUrl: joi
        .string()
        .trim()
        .uri()
        .optional()
        .messages({
          "string.uri": "Invalid GitHub URL",
        }),
    })
    .optional(),

  linkedin: joi
    .object({
      profileUrl: joi
        .string()
        .trim()
        .uri()
        .optional()
        .messages({
          "string.uri": "Invalid LinkedIn URL",
        }),
    })
    .optional(),

  portfolioUrl: joi
    .string()
    .trim()
    .uri()
    .optional()
    .messages({
      "string.uri": "Invalid portfolio URL",
    }),

  privacy: joi
    .object({
      showAge: joi.boolean().optional(),
      showGender: joi.boolean().optional(),
      showLocation: joi.boolean().optional(),
      showGithub: joi.boolean().optional(),
      showLinkedin: joi.boolean().optional(),
      showPortfolio: joi.boolean().optional(),
    })
    .optional(),
});

module.exports = {
  userSchema,
  loginSchema,
  updateSchema,
};
