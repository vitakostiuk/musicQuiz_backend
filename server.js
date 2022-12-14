const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// connect to database

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
