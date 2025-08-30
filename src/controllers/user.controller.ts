import { Request, response, Response } from "express";
import { BaseController } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { QueryFailedError } from "typeorm";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema";
import { clerkMiddleware, getAuth } from "@clerk/express";

export class UserController extends BaseController<User> {
  // private userRepository = AppDataSource.getRepository(User);
  constructor() {
    super(User);
  }

  async createUser(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }
    const { userId } = getAuth(request);

    if (!userId) {
      return response.status(401).json({ error: "Unauthorized" });
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
      console.log(error);
    }
  }
}
