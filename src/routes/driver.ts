import express from "express";

import controller from "../controllers/driverController.js";
import requestValidation from "../validators/driverValidators.js";
import validationMiddleware from "../middlewares/validation.js";
import dbMiddleware from "../middlewares/mongo.js";

const router = express.Router();

router.get("/", controller.getDrivers);

router.get("/:id", dbMiddleware.checkForValidId("id"), controller.getDriver);

router.delete(
  "/:id",
  dbMiddleware.checkForValidId("id"),
  controller.deleteDriver,
);

router.post(
  "/",
  requestValidation.validatePostDriver,
  validationMiddleware.checkForErrors,
  controller.postDriver,
);

router.put(
  "/:id",
  dbMiddleware.checkForValidId("id"),
  requestValidation.validatePutDriver,
  validationMiddleware.checkForErrors,
  controller.putDriver,
);

router.patch(
  "/:id",
  dbMiddleware.checkForValidId("id"),
  requestValidation.validatePatchDriver,
  validationMiddleware.checkForErrors,
  controller.patchDriver,
);

export default router;
