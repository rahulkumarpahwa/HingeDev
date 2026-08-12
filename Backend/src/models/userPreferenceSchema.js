const { default: mongoose } = require("mongoose");
const User = require("./userSchema");

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    lookingFor: {
      type: [String],

      enum: [
        "friendship",
        "networking",
        "project_partner",
        "cofounder",
        "mentor",
        "mentee",
        "open_source",
        "study_partner",
        "job_opportunity",
        "hiring",
        "freelance",
      ],

      default: ["networking"],
    },

    preferredExperienceLevels: {
      type: [String],

      enum: ["beginner", "intermediate", "advanced", "expert"],

      default: [],
    },

    preferredSkills: {
      type: [String],
      default: [],
    },

    preferredRoles: {
      type: [String],

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

      default: [],
    },

    ageRange: {
      min: {
        type: Number,
        min: 18,
      },

      max: {
        type: Number,
        max: 100,
      },
    },


    maxDistanceKm: {
      type: Number,
      default: 50,
      min: 1,
    },


    collaborationPreference: {
      type: [String],

      enum: ["remote", "hybrid", "in_person"],

      default: ["remote"],
    },

    discoveryEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserPreference = mongoose.model("UserPreferences", userPreferenceSchema);
module.exports = { UserPreference };
