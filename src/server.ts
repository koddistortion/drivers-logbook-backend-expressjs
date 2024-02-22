import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";

import errorHandling from "./controllers/errorController.js";
import vehicleRouter from "./routes/vehicle.js";
import driverRouter from "./routes/driver.js";
import locationRouter from "./routes/location.js";
import env from "./env.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/vehicles", vehicleRouter);
app.use("/drivers", driverRouter);
app.use("/locations", locationRouter);

app.use(errorHandling);

connectToDatabase().catch((err) => console.log(err));

async function connectToDatabase() {
  const PORT = env.PORT;
  const MONGODB_URL = env.MONGODB_URL;
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGODB_URL);
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
