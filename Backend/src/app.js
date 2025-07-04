const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Namaste World!");
});

app.get("/start", (req, res) => {
  res.send({ apple: "is the best device" });
});


app.use("/a", (req, res) => {
  res.send("Hello from A server!");
});

app.use((req, res) => {
  res.send("Hello from server!");
});

const port = 8000;

app.listen(port, () => {
  console.log(`server is successfully listening at port ${port}`);
});
