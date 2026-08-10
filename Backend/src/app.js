const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database.js");
const cors = require("cors");
const { env } = require("../envParser.js");
const helmet = require("helmet");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorHandler.js");

const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]);

connectDB()
  .then(() => {
    console.log("database connected.");
    app.listen(env.PORT, () => {
      console.log(`server is successfully listening at port ${env.PORT}`);
      console.log(`http://localhost:${env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database error: ${err.message}`);
    console.log("Graceful Shutdown!");
    process.exit(1);
  });

const corsOptions = {
  origin: ["http://localhost:5173", "https://hingedev.netlify.app"],
  methods: ["GET", "POST", "PUT", "PATCH"],
  optionsSuccessStatus: 200,
  credentials: true, // allow cookies and credentials
};

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors(corsOptions)); // cors middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // parsing the cookies.

// make sure to put these after the parser.
const { apiRouter } = require("./index.js");

// trust the proxy
/**
 * One important thing: Nginx / Cloudflare. If your backend is behind Nginx, Cloudflare, a load balancer, etc., req.socket.remoteAddress may give you the proxy's IP instead of the actual user's IP. In that situation, you need to configure your proxy correctly and read the appropriate forwarded header.
 */
app.set("trust proxy", true);

// like the middlewares, we pass the routers
app.use("/api/v1", apiRouter);

// 404 handler for API routes
app.use("/api/v1/*path", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);
