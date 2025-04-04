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
  "/register",
  Protected(false),
  ValidationMiddleware(registerUserSchema),
  userController.register
);

// Login route
userRouter.post(
  "/login",
  Protected(false),
  ValidationMiddleware(loginUserSchema), // You might want to create a specific schema for login validation
  userController.login
);

// Get all users
userRouter.get("/", Protected(false), userController.getAllUsers);

// Get user by ID
userRouter.get("/:id", Protected(false), userController.getOneUser);

// Update user by ID
userRouter.put(
  "/:id",
  Protected(true),
  ValidationMiddleware(updateUserSchema), // Make sure updateUserSchema is correctly defined
  userController.updateUser
);

// Delete user by ID
userRouter.delete("/:id", Protected(true), userController.deleteUser);

export default userRouter;
