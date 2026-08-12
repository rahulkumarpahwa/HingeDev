const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../../envParser");
const { responseError, errorConstants } = require("../utils/error");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // unique field does not need to create the index as the mongoDB creates the index by itself for such properties.
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid Email Address",
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },

    accountStatus: {
      type: String,
      enum: ["active", "inactive", "suspended", "banned", "deleted"],
      default: "active",
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: [
        "Woman",
        "Man",
        "Non-binary",
        "Trans Woman",
        "Trans Man",
        "Genderqueer",
        "Agender",
        "Genderfluid",
        "Prefer not to say",
        "Other",
      ],
      validate(value) {
        if (
          ![
            "male",
            "female",
            "non_binary",
            "other",
            "prefer_not_to_say",
          ].includes(value)
        ) {
          responseError(
            400,
            errorConstants.ValidationError,
            "invalid gender value",
          );
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/026/434/417/non_2x/default-avatar-profile-icon-of-social-media-user-photo-vector.jpg",
      validate: {
        validator: validator.isURL,
        message: "Invalid photo URL",
      },
    },
    bio: {
      type: String,
      maxlength: 500,
    },

    developerRole: {
      type: String,
      enum: [
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
      ],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      required: true,
    },

    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length <= 20,
        message: "Maximum 20 skills allowed",
      },
    },

    interests: {
      type: [String],
      default: [],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },

      coordinates: {
        type: [Number],
        required: true,

        validate: {
          validator: (value) =>
            value.length === 2 &&
            value[0] >= -180 &&
            value[0] <= 180 &&
            value[1] >= -90 &&
            value[1] <= 90,

          message: "Coordinates must be [longitude, latitude]",
        },
      },
    },

    city: String,
    state: String,
    country: String,
    timezone: {
      type: String,
      default: "UTC",
    },

    github: {
      username: String,
      profileUrl: String,
      validate: {
        validator: (value) => !value || validator.isURL(value),
        message: "invalid GitHub url",
      },
    },

    linkedin: {
      profileUrl: String,
      validate: {
        validator: (value) => !value || validator.isURL(value),
        message: "invalid Linkedin url",
      },
    },

    portfolioUrl: {
      type: String,
      validate: {
        validator: (value) => !value || validator.isURL(value),
        message: "Invalid portfolio URL",
      },
    },

    bioEmbedding: {
      type: [Number], // Array of numbers for embedding vector
      default: null,
    },

    privacy: {
      showAge: {
        type: Boolean,
        default: true,
      },

      showGender: {
        type: Boolean,
        default: false,
      },

      showLocation: {
        type: Boolean,
        default: true,
      },

      showGithub: {
        type: Boolean,
        default: true,
      },

       showLinkedin: {
        type: Boolean,
        default: true,
      },

      showPortfolio: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }, // adding the timestamps
);

// Create a 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });

// don't use the arrow methods.
userSchema.methods.getJWT = function () {
  const user = this; // as the every instace (newUser) is instace of User model so 'this' refers to that instance.
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 2,
    },
  );
  return token;
};

// don't use the arrow methods.
userSchema.methods.getPasswordValid = async function (passwordbyuser) {
  const user = this; // as the every instace (newUser) is instace of User model so 'this' refers to that instance.
  const isValidPassword = await bcrypt.compare(passwordbyuser, user.password); // second parameter is hashed password of the user
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };

/*
 *  It is bad idea. why ? because their are so edge cased like the storing the userId will nt make the sense. as the some requests may get aaccepted. some may get hanged in between and some are reqjected and so on. so that's why it is difficult to handled here.
    Also, the schema defines the something. like userSchema defines the user and similarly we will create a new schema which will define the connection.
     connections: {
    type: Schema.Types.ObjectId,
      ref:
    },
 */