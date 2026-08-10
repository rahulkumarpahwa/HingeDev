const express = require("express");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const apiRouter = express.Router();


apiRouter.use("/", authRouter)
apiRouter.use("/profile", profileRouter);
apiRouter.use("/request", requestRouter);
apiRouter.use("/user", userRouter);


module.exports = {apiRouter};