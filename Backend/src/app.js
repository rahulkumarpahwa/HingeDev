const express = require("express");
const app = express();
const { connectDB } = require("./config/database.js");
const { User } = require("./models/userSchema.js");
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

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.send("data added successfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    console.log(data);
    // res.send("data founded successfully! " + "data is : \n" +  data + data.length);
    res.json({ success: true, data: data, length: data.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("User deleted successfully!");
    res.send("deleted user" + deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.patch("/user", async (req, res) => {
  // const userId = req.body.userId;
  // const firstName = req.body.firstName;
  const {userId, firstName} = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {firstName : firstName}, { new: true });
    console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

