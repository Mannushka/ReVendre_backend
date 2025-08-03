import { Request, response, Response } from "express";
import { BaseController } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { QueryFailedError } from "typeorm";

export class UserController extends BaseController<User> {
  // private userRepository = AppDataSource.getRepository(User);
  constructor() {
    super(User);
  }

  // async all(request: Request, response: Response) {
  //   const users = await this.userRepository.find();
  //   response.send(users);
  // }
  // catch(error: unknown) {
  //   if (error instanceof QueryFailedError) {
  //     response.status(400).json({
  //       message: "Database query failed",
  //       detail: error.message,
  //     });
  //   } else if (error instanceof Error) {
  //     response.status(500).json({
  //       message: "Internal server error",
  //       error: error.message,
  //     });
  //   } else {
  //     response.status(500).json({ message: "Unknown error occurred" });
  //   }
  // }

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
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        // Handle unique constraint violations (e.g., duplicate email)
        if (
          error.driverError?.code === "ER_DUP_ENTRY" ||
          error.message.includes("duplicate key")
        ) {
          return response.status(409).json({
            message: "Email already exists",
            error: error.message,
          });
        }

        // Handle other database errors
        return response.status(500).json({
          message: "Database operation failed",
          error: error.message,
        });
      }

      // General Error instance (non-TypeORM errors)
      if (error instanceof Error) {
        return response.status(500).json({
          message: "Internal server error",
          error: error.message,
        });
      }

      // Fallback for unknown error types
      return response.status(500).json({
        message: "Unexpected error occurred",
      });
    }
  }
}
