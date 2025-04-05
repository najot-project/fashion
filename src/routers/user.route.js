import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {
  registerUserSchema,
  updateUserSchema,
  loginUserSchema,
} from "../schema/user.schema.js";

const userRouter = Router();

// Register route
userRouter.post(
  "/register",Protected(false),Roles(ROLES.ALL),
  ValidationMiddleware(registerUserSchema),
  userController.register
);

// Login route
userRouter.post(
  "/login",Protected(false),Roles(ROLES.ALL),
  ValidationMiddleware(loginUserSchema),
  userController.login
);

// Get all users
userRouter.get("/",Protected(true),Roles(ROLES.RESTAURANT_OWNER,ROLES.SUPER_ADMIN), userController.getAllUsers);

// Get user by ID
userRouter.get(
  "/:id",Protected(true),Roles(ROLES.RESTAURANT_OWNER,ROLES.SUPER_ADMIN),
  userController.getOneUser
);

// Update user by ID
userRouter.put(
  "/:id",Protected(false),Roles(ROLES.ALL),
  ValidationMiddleware(updateUserSchema),
  userController.updateUser
);

// Delete user by ID
userRouter.delete("/:id",Protected(false),Roles(ROLES.ALL),userController.deleteUser);

export default userRouter;
