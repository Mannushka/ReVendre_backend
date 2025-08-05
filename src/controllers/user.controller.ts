import { Request, response, Response } from "express";
import { BaseController } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { QueryFailedError } from "typeorm";
import { Validate } from "class-validator";

export class UserController extends BaseController<User> {
  // private userRepository = AppDataSource.getRepository(User);
  constructor() {
    super(User);
  }

  async createUser(request: Request, response: Response) {
    const { userName, email, phoneNumber, imageUrl } = request.body;

    //TO DO -> DATA TYPE VALIDATION!!!

    try {
      if (!userName || !email) {
        return response
          .status(400)
          .json({ message: "User name and email are required" });
      }

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
