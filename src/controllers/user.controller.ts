import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { User } from "../entity/User";
import { validationResult } from "express-validator";
import { getAuth, clerkClient } from "@clerk/express";

export class UserController extends BaseController<User> {
  // private userRepository = AppDataSource.getRepository(User);
  constructor() {
    super(User);
  }

  async createUser(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({
        errors: errors.array(),
      });
    }
    const { userId } = getAuth(request);

    if (!userId) {
      response.status(401).json({ error: "Unauthorized" });
    }
    const { userName, email, phoneNumber, imageUrl } = request.body;

    try {
      const user = this.repository.create({
        clerkId: userId,
        userName,
        email,
        phoneNumber: phoneNumber || null,
        imageUrl: imageUrl || null,
      });

      const savedUser = await this.repository.save(user);
      response.status(201).json(savedUser);
    } catch (error) {
      console.error("DB insert failed:", error);

      try {
        console.log("Attempting rollback for userId:", userId);
        const deleted = await clerkClient.users.deleteUser(userId);
        console.log("Rollback success:", deleted.id);
      } catch (clerkErr: any) {
        console.error("Failed to rollback Clerk user:", clerkErr);
      }

      response.status(500).json({ error: "Failed to create user record" });
    }
  }

  async deleteClerkUser(request: Request, response: Response) {
    try {
      const { clerkUserId } = request.params;

      if (!clerkUserId) {
        response.status(401).json({ error: "Unauthorized" });
      }
      const deletedUser = await clerkClient.users.deleteUser(clerkUserId);
      console.log("Successfully deleted Clerk user:", deletedUser.id);
      response.status(200).json({ message: "Clerk user deleted successfully" });
    } catch (error) {
      console.error("Error deleting Clerk user:", error);
      response.status(500).json({ error: "Failed to delete Clerk user" });
    }
  }
}
