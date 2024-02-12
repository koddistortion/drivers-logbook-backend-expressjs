import mongoose from "mongoose";

import app from ".";
import env from "./env";

import { handleError } from "./controllers/errorController";
import { router as vehicleRoutes } from "./routes/vehicle";

app.use("/vehicles", vehicleRoutes);
app.use(handleError);

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
