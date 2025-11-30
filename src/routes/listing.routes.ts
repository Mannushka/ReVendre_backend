import express from "express";
import { ListingController } from "../controllers/listing.controller";
import { checkSchema } from "express-validator";
import { createListingValidationSchema } from "../utils/validationSchema";

const router = express.Router();
const listingController = new ListingController();
router.get("/", listingController.getAll.bind(listingController));
router.get("/:id", listingController.getOne.bind(listingController));
router.post(
  "/",
  checkSchema(createListingValidationSchema),
  listingController.createListing.bind(listingController)
);

export default router;
