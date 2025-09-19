const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/userSchema.js");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validation.js");
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); // validating the data before saving.
    const { firstName, lastName, email, password } = req.body;
    // encrypting the data
    const passwordHash = await bcrypt.hash(password, 10); // password and 10 salt rounds.
    // returns a promise so use a await to handle that.
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await newUser.save();
    const token = await newUser.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

    // need to convert the findUser mongoose document to object to have the js methods over it.
    const user = Object.keys(newUser.toObject()).reduce((acc, key) => {
      if (key !== "password") acc[key] = newUser[key]; // acc means accumulator
      return acc;
    }, {});
    res.json({
      success: true,
      status: 200,
      message: "User Signup Successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).send("error : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validating the email:
    if (!validator.isEmail(email)) {
      throw new Error("Enter a valid credentials!");
    }
    // checking if userExist or not.
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      throw new Error("Invalid Credentials!");
    }

    const isValidPassword = await findUser.getPasswordValid(password);
    if (isValidPassword) {
      const token = await findUser.getJWT();
      res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

      // need to convert the findUser mongoose document to object to have the js methods over it.
      const user = Object.keys(findUser.toObject()).reduce((acc, key) => {
        if (key !== "password") acc[key] = findUser[key]; // acc means accumulator
        return acc;
      }, {});

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
});

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
