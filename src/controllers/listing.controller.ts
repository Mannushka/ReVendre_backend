import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Listing } from "../db/entities/Listing";
import { validationResult } from "express-validator";

export class ListingController extends BaseController<Listing> {
  constructor() {
    super(Listing);
  }

  async createListing(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, userId } = request.body;
    const isActive = true;

    try {
      const listing = this.repository.create({
        title,
        description,
        price,
        userId,
        isActive,
      });

      const savedListing = await this.repository.save(listing);
      response.status(201).json(savedListing);
    } catch (error) {
      console.error("DB insert failed:", error);
      response.status(500).json({ error: "Failed to create listing" });
    }
  }
}
