import express from "express";
import { UserController } from "../controllers/user.controller";
import { checkSchema } from "express-validator";
import {
  createUserValidationSchema,
  getOneByIdValidationSchema,
} from "../utils/validationSchema";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll.bind(userController));
router.get(
  "/:id",
  getOneByIdValidationSchema,
  userController.getOne.bind(userController)
);
router.post(
  "/",
  checkSchema(createUserValidationSchema),
  userController.createUser.bind(userController)
);

export default router;
