import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Listing } from "../db/entities/Listing";
import { AppDataSource } from "../data-source";
import { getAuth } from "@clerk/express";
import { User } from "../db/entities/User";
import { validationResult } from "express-validator";
import { QueryFailedError } from "typeorm";
import { ListingPhoto } from "../db/entities/ListingPhoto";

export class ListingController extends BaseController<Listing> {
  constructor() {
    super(Listing);
  }

  async createListing(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { userId, isAuthenticated } = getAuth(request); //retrieve clerk user id
    console.log("Clerk User ID:", userId);
    console.log("isAuthenticated:", isAuthenticated);

    //handle errors if user is not found
    if (!userId) {
      return response.status(401).json({ error: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ clerkId: userId });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    const { title, description, price, categoryId, imageUrls } = request.body;
    console.log("data received in body:", request.body);
    let listingId: string;
    try {
      const result = await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          const listing = transactionalEntityManager.create(Listing, {
            title,
            description,
            price,
            categoryId: categoryId,
            isActive: true,
            userId: user.id,
          });
          console.log("Created listing entity:", listing);
          const savedListing = await transactionalEntityManager.save(
            Listing,
            listing,
          );
          listingId = savedListing.id;
          console.log("Listing saved with ID:", listingId);
          console.log(
            "image urls are correct:",
            imageUrls && Array.isArray(imageUrls),
          );

          if (imageUrls && Array.isArray(imageUrls)) {
            const listingPhotoRepository =
              transactionalEntityManager.getRepository(ListingPhoto);
            for (const url of imageUrls) {
              const photo = listingPhotoRepository.create({
                imgUrl: url,
                listingId: listingId,
              });
              console.log("Saving photo with URL:", url);
              await listingPhotoRepository.save(photo);
            }
            console.log("All photos saved for listing ID:", listingId);
          }

          return savedListing;
        },
      );

      return response.status(201).json(result);
    } catch (error) {
      console.error("Transaction failed:", error);
      return response.status(500).json({ error: "Failed to create listing" });
    }
    //   const listing = this.repository.create({
    //     title,
    //     description,
    //     price,
    //     categoryId: categoryId,
    //     isActive: true,
    //     userId: user.id,
    //   });

    //   const savedListing = await this.repository.save(listing);
    //   listingId = savedListing.id;
    //   response.status(201).json(savedListing);
    // } catch (error) {
    //   console.error("DB insert failed:", error);
    //   response.status(500).json({ error: "Failed to create listing" });
    // }

    // return response.status(201).json(savedListing);
  }
  async deleteListing(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const listing = await this.repository.findOneBy({ id: id } as any);
      if (!listing) {
        return response.status(404).json({ message: "Listing not found :(" });
      }

      await this.repository.remove(listing);
      return response
        .status(200)
        .json({ message: "Listing deleted successfully" });
    } catch (error) {
      console.error("deleteListing failed:", error);

      if (error instanceof QueryFailedError) {
        return response.status(500).json({
          message: "Database error",
          error: error.message,
        });
      }

      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
