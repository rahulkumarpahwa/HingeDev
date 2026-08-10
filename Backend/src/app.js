const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database.js");
const cors = require("cors");
const {env} = require("../envParser.js")

connectDB()
  .then(() => {
    console.log("database connected successfully!");
    app.listen(env.PORT, () => {
      console.log(`server is successfully listening at port ${env.PORT}`);
      console.log(`http://localhost:${env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1)
  });

const corsOptions = {
  origin: ["http://localhost:5173", "https://hingedev.netlify.app"],
  methods: ["GET", "POST", "PUT", "PATCH"],
  optionsSuccessStatus: 200,
  credentials: true, // allow cookies and credentials
};

app.use(cors(corsOptions)); // cors middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // parsing the cookies.

// make sure to put these after the parser.
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

// like the middlewares, we pass the routers
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);
