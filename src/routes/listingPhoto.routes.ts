import express from "express";
import { ListingPhotoController } from "../controllers/listingPhoto.controller";
import { checkSchema } from "express-validator";
import { createListingPhotoValidationSchema } from "../utils/validationSchema";

const router = express.Router();
const listingPhotoController = new ListingPhotoController();

router.get("/", listingPhotoController.getAll.bind(listingPhotoController));
router.get("/:id", listingPhotoController.getOne.bind(listingPhotoController));
router.post(
  "/",
  checkSchema(createListingPhotoValidationSchema),
  listingPhotoController.createListingPhoto.bind(listingPhotoController)
);

export default router;
