const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/userSchema.js");
const validator = require("validator");
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequestModel = require("../models/connectionRequestSchema.js");
const { getUserIP } = require("../middlewares/ipConfig.js");
const { validateTurnstile } = require("../middlewares/turnstile.js");
const { validateBody } = require("../middlewares/validate.js");
const { userSchema, loginSchema } = require("../schemas/userSchema.js");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  getUserIP,
  validateTurnstile,
  validateBody(userSchema),
  async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        ...req.body,
        password: passwordHash,
      });
      await newUser.save();
      const token = await newUser.getJWT();
      res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });
      const user = { ...newUser.toObject(), password: undefined };
      res.json({
        success: true,
        status: 200,
        message: "User Signup Successfully!",
        data: user,
      });
    } catch (error) {
      res.status(400).send("error : " + error.message);
    }
  },
);

authRouter.post(
  "/login",
  getUserIP,
  validateTurnstile,
  validateBody(loginSchema),
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ email: email });
      if (!findUser) {
        throw new Error("Invalid Credentials!");
      }
      const isValidPassword = await findUser.getPasswordValid(password);
      if (isValidPassword) {
        const token = await findUser.getJWT();
        res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

        const user = { ...findUser.toObject(), password: undefined };

        res.json({
          success: true,
          status: 200,
          message: "Login Successfully!",
          user,
        });
      } else {
        throw new Error("Invalid Credentials!");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
);

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).send("User Logged Out, Successfully!");
});

authRouter.delete("/delete", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    // deleting all the connectionRequest when the user is no longer exits! either Interested, Ignored.
    const deletedConnectionRequest = await ConnectionRequestModel.deleteMany({
      $or: [
        {
          toUserId: userId,
        },
        {
          fromUserId: userId,
        },
      ],
    });

    const deletedUser = await User.findByIdAndDelete(userId);
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    }); // deleting the cookies as well.
    // console.log("User deleted successfully!" + deletedUser);
    res.send({
      success: true,
      status: 200,
      message: "User deleted Successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = authRouter;
