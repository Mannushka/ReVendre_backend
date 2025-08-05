import { Request, response, Response } from "express";
import { BaseController } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { QueryFailedError } from "typeorm";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema";

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

    const { userName, email, phoneNumber, imageUrl } = request.body;

    try {
      // if (!userName || !email) {
      //   return response
      //     .status(400)
      //     .json({ message: "User name and email are required" });
      // }

      const user = this.repository.create({
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
