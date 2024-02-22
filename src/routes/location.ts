import express from "express";
import dbMiddleware from "../middlewares/mongo.js";
import controller from "../controllers/locationController.js";
//import requestValidation from "../validators/driverValidators.js";
//import validationMiddleware from "../middlewares/validation.js";

const router = express.Router();

router.get("/", controller.getLocations);

router.get("/:id", dbMiddleware.checkForValidId("id"), controller.getLocation);

router.delete(
  "/:id",
  // dbMiddleware.checkForValidId("id"),
  controller.deleteLocation,
);

router.post(
  "/",
  // requestValidation.validatePostDriver,
  // validationMiddleware.checkForErrors,
  controller.postLocation,
);

router.put(
  "/:id",
  // dbMiddleware.checkForValidId("id"),
  // requestValidation.validatePutDriver,
  // validationMiddleware.checkForErrors,
  controller.putLocation,
);

router.patch(
  "/:id",
  // dbMiddleware.checkForValidId("id"),
  // requestValidation.validatePatchDriver,
  // validationMiddleware.checkForErrors,
  controller.patchLocation,
);
export default router;
