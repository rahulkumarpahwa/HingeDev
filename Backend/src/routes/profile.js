const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { userAuth } = require("../middlewares/auth.js");
const { User } = require("../models/userSchema.js");
const { generateBioEmbedding } = require("../utils/matching.js");
const { responseError, errorConstants } = require("../utils/error.js");
const { validateBody } = require("../middlewares/validate.js");
const { updateSchema } = require("../schemas/userSchema.js");
const profileRouter = express.Router();

profileRouter.get("/restore", userAuth, async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      success: true,
      message: "Restore User successfully.",
      user: req.user,
    });
  } catch (error) {
    responseError(400, errorConstants.InternalServerError, error.message);
  }
});

profileRouter.patch(
  "/edit",
  userAuth,
  validateBody(updateSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const loggedInUser = req.user;

      if (id && id !== loggedInUser._id) {
        responseError(400, errorConstants.UnauthorizedError, "Bad Request.");
      }

      // // ============ EMBEDDING GENERATION ============
      // // If bio (about) is being updated, generate embedding
      // if (about) {
      //   const bioEmbedding = generateBioEmbedding(about);
      //   req.body.bioEmbedding = bioEmbedding;
      // }

      const updatedUser = await User.findByIdAndUpdate(
        loggedInUser._id,
        req.body,
        { new: true, runValidators: true },
      );
      res.status(201).json({
        success: true,
        status: 201,
        message: "user profile has been updated.",
        updatedUser,
      });
    } catch (e) {
      responseError(400, errorConstants.InternalServerError, e.message);
    }
  },
);

profileRouter.patch("/password", userAuth, async (req, res) => {
  try {
    const ALLOWED_EDIT_FIELDS = ["newPassword", "reNewPassword"];
    const isEditAllowed = Object.keys(req.body).every(
      (key) => ALLOWED_EDIT_FIELDS.includes(key), // key represent the each key.
    );
    if (!isEditAllowed) {
      throw new Error("Update not Allowed!");
    }
    const { newPassword, reNewPassword } = req.body;
    if (newPassword !== reNewPassword) {
      throw new Error("Password must be same!");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password must be Strong!");
    }

    // hashing and salting :
    const passwordHash = await bcrypt.hash(newPassword, 10); // password and 10 salt rounds.
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      password: passwordHash,
    });

    res.send({ data: updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = profileRouter;
