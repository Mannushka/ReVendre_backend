import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { ListingPhoto } from "../db/entities/ListingPhoto";
import { validationResult } from "express-validator";

export class ListingPhotoController extends BaseController<ListingPhoto> {
  constructor() {
    super(ListingPhoto);
  }

  async createListingPhoto(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { listingId, imgUrl } = request.body;
    try {
      const listingPhoto = this.repository.create({
        listingId,
        imgUrl,
      });

      const savedListingPhoto = await this.repository.save(listingPhoto);
      response.status(201).json(savedListingPhoto);
    } catch (error) {
      console.error("DB insert failed:", error);
      response.status(500).json({ error: "Failed to create listing photo" });
    }
  }
  async deleteListingPhoto(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const listingPhoto = await this.repository.findOneBy({ id: id } as any);
      if (!listingPhoto) {
        return response
          .status(404)
          .json({ message: "Listing photo not found :(" });
      }

      await this.repository.remove(listingPhoto);
      return response
        .status(200)
        .json({ message: "Listing photo deleted successfully" });
    } catch (error) {
      console.error("deleteListingPhoto failed:", error);

      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
