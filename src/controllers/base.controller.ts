import { Request, Response } from "express";
import { Repository, FindManyOptions, FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { QueryFailedError } from "typeorm";
import { validate as isUUID } from "uuid";

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

  async getOne(request: Request, response: Response) {
    const id = request.params.id;
    if (!id || typeof id !== "string" || !isUUID(id)) {
      return response
        .status(400)
        .json({ message: "Id is missing or invalid :(" });
    }

    try {
      const item = await this.repository.findOneBy({ id: id } as any);
      if (!item) {
        return response.status(404).json({ message: "Item not found :(" });
      }

      return response.json(item);
    } catch (error) {
      console.error("getOne failed:", error);

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
