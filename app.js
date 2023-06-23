require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3000, MONGO_DB = "mongodb://localhost:27017/bitfilmsdb" } = process.env;

const app = express();

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_DB);

  app.use(express.json());
  app.use(helmet());
  app.use(cookieParser());
  app.use(router);
  app.use(errors());
  app.use(errorHandler);
  app.listen(PORT);
}

// eslint-disable-next-line no-console
main().catch((error) => console.log(error));
