import express from "express";

import driverController from "../controllers/driverController";
import { postDriverValidation } from "../validators/driverValidators";
import { MongoIdCheck } from "../middlewares/mongo";

const router = express.Router();

router.get("/", driverController.getDrivers);
router.get("/:id", MongoIdCheck("id"), driverController.getDriver);
router.delete("/:id", MongoIdCheck("id"), driverController.deleteDriver);
router.post("/", postDriverValidation(), driverController.postDriver);
router.patch("/:id", MongoIdCheck("id"), driverController.patchDriver);

export const driverRouter = router;
