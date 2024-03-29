const express = require("express");

const cors = require("cors");

require("dotenv").config();

//import routers
const usersRouter = require("./routes/api/users");
const gameRouterEN = require("./routes/api/game");
const gameRouterUKR = require("./routes/api/gameUKR");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/game/en", gameRouterEN);
app.use("/api/game/ukr", gameRouterUKR);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// swj0czRaWAPEii0f
