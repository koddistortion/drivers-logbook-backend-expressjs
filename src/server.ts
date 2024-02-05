import mongoose from "mongoose";

import app from ".";
import env from "./env";
import vehicleRoutes from "./routes/vehicle";

app.use('/vehicles', vehicleRoutes)

connectToDatabase().catch((err) => console.log(err));
async function connectToDatabase() {
    const PORT = env.PORT;
    const MONGODB_URL = env.MONGODB_URL;
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, async () => {
        console.log(`listening on port ${PORT}`);
    })
}


