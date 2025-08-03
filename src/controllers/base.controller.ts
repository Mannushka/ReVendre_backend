import { Request, Response } from "express";
import { Repository, FindManyOptions } from "typeorm";
import { AppDataSource } from "../data-source";
import { QueryFailedError } from "typeorm";

export abstract class BaseController<Entity> {
  protected repository: Repository<Entity>;

  constructor(entityClass: new () => Entity) {
    this.repository = AppDataSource.getRepository(entityClass);
  }

  async getAll(request: Request, response: Response) {
    try {
      const items = await this.repository.find();
      response.json(items);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        response.status(400).json({
          message: "Database query failed",
          detail: error.message,
        });
      } else if (error instanceof Error) {
        response.status(500).json({
          message: "Internal server error",
          error: error.message,
        });
      } else {
        response.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }
}
