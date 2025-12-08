import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Category } from "../db/entities/Category";

export class CategoryController extends BaseController<Category> {
  constructor() {
    super(Category);
  }
}
