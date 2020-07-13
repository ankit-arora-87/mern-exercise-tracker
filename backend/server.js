const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mongo DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  setNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection established successfully");
});

// API Routes
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

// Server listens here
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
