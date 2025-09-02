const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { connectDB } = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const { validateSignUpData } = require("./utils/validation.js");
const { userAuth } = require("./middlewares/auth.js"); // require the user auth.
const secret = "jhfsdfhshfsfhhfjahfkasfhk"; // any random secret for the jwt. can put as env as well.
const port = 8000;

connectDB()
  .then(() => {
    console.log("database connected successfully!");
    app.listen(port, () => {
      console.log(`server is successfully listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use(cookieParser()); // parsing the cookies.

app.post("/signup", async (req, res) => {
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
    res.send("data added successfully!");
  } catch (error) {
    res.status(400).send("error : " + error.message);
  }
});

app.post("/login", async (req, res) => {
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

      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user); // sending back the user details after verifying with the userAuth.
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.get("/feed", userAuth, async (req, res) => {
  try {
    const data = await User.find({});
    res.json({ success: true, data: data, length: data.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// we will here apply the userAuth as the middleware.
app.delete("/user", userAuth, async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("User deleted successfully!");
    res.send("deleted user" + deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// we will apply the userAuth here as middleware.
app.patch("/user/:userId", userAuth, async (req, res) => {
  // API validations
  const userId = req.params?.userId; // we will take the userId from the params.
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["about", "photoUrl", "skills"];
    const isUpdateAllowed = Object.keys(data).every(
      (k) => ALLOWED_UPDATES.includes(k) // k represent the each key.
    );

    // one check
    if (!isUpdateAllowed) {
      throw new Error("Update not Alllowed");
    }

    // skills length validation
    if (data?.skills.length > 10) {
      throw new Error("Skills can't be more than 10.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, // Id to identify the user.
      data, // data to be updated
      { new: true, runValidators: true } // options objects
    );

    console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/sendconnectionrequest", userAuth, async (req, res) => {
  res.send("this is the test send connection request by " + req.user.firstName);
});
