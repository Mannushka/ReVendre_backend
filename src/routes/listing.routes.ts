import express from "express";
import { ListingController } from "../controllers/listing.controller";
import { checkSchema } from "express-validator";
import { createListingValidationSchema } from "../utils/validationSchema";

const router = express.Router();
const listingController = new ListingController();
router.post(
  "/",
  checkSchema(createListingValidationSchema),
  listingController.createListing.bind(listingController)
);

export default router;
