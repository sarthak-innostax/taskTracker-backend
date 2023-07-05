require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;

const todoRoutes = require("./routes/todo");

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    abortOnLimit: true,
    safeFileNames: true,
    limitHandler: (req, res, next) => {
      const err = new Error("File too large, max 10MB is expected");
      err.httpStatusCode = 413;
      return next(err);
    },
  })
);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "HELLO FROM BACKEND" });
});

app.use("/todo", todoRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  return res.status(error.httpStatusCode || 500).json({
    status: "ERROR",
    errorMessage: error.message,
    errorStatusCode: error.httpStatusCode,
  });
});

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    app.listen(PORT, () => {
      console.log("DATABASE CONNECTED");
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
