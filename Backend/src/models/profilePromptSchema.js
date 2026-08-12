const { default: mongoose } = require("mongoose");

const profilePromptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    promptType: {
      type: String,

      enum: [
        "currently_building",
        "proudest_project",
        "recently_learned",
        "favorite_technology",
        "looking_for",
        "developer_hot_take",
        "dream_project",
        "favorite_open_source_project",
      ],

      required: true,
    },

    answer: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  },
);

const ProfilePromptModel = mongoose.model(
  "ProfilePromptModel",
  profilePromptSchema,
);

module.exports = { ProfilePromptModel };
