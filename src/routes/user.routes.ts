import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.all.bind(userController));
router.post("/", userController.save.bind(userController));

export default router;
