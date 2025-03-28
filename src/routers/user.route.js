import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { registerUserSchema, updateUserSchema } from "../schema/user.schema.js";

const userRouter = Router();

userRouter
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getOneUser)
  .post("/", ValidationMiddleware(registerUserSchema), userController.createUser)
  .put("/:id", ValidationMiddleware(updateUserSchema), userController.updateUser)
  .delete("/:id", userController.deleteUser);

export default userRouter;
