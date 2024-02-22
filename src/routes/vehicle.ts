import express from "express";

import controller from "../controllers/vehicleController.js";
import requestValidation from "../validators/vehicleValidators.js";
import validationMiddleware from "../middlewares/validation.js";
import dbMiddleware from "../middlewares/mongo.js";

const router = express.Router();

router.get("/", controller.getVehicles);

router.get("/:id", dbMiddleware.checkForValidId("id"), controller.getVehicle);

router.delete(
  "/:id",
  dbMiddleware.checkForValidId("id"),
  controller.deleteVehicle,
);

router.post(
  "/",
  requestValidation.validatePostVehicle,
  validationMiddleware.checkForErrors,
  controller.postVehicle,
);

router.put(
  "/:id",
  dbMiddleware.checkForValidId("id"),
  requestValidation.validatePutVehicle,
  validationMiddleware.checkForErrors,
  controller.putVehicle,
);

router.patch(
  "/:id",
  dbMiddleware.checkForValidId("id"),
  requestValidation.validatePatchVehicle,
  validationMiddleware.checkForErrors,
  controller.patchVehicle,
);

export default router;
