import express from "express";
import { UserController } from "../controllers/user.controller";
import { BaseController } from "../controllers/base.controller";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll.bind(userController));
router.get("/:id", userController.getOne.bind(userController));
router.post("/", userController.createUser.bind(userController));

export default router;
