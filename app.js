const express = require("express");

const cors = require("cors");

require("dotenv").config();

//import routers
const usersRouter = require("./routes/api/users");
const gameRouter = require("./routes/api/game");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/game", gameRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// swj0czRaWAPEii0f
