import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { registerUserSchema, updateUserSchema } from "../schema/user.schema.js";

const userRouter = Router();

// Register route
userRouter.post(
  "/register",
  ValidationMiddleware(registerUserSchema),
  userController.register
);

// Login route
userRouter.post(
  "/login",
  ValidationMiddleware(registerUserSchema), // You might want to create a specific schema for login validation
  userController.login
);

// Get all users
userRouter.get("/", userController.getAllUsers);

// Get user by ID
userRouter.get("/:id", userController.getOneUser);

// Update user by ID
userRouter.put(
  "/:id",
  ValidationMiddleware(updateUserSchema), // Make sure updateUserSchema is correctly defined
  userController.updateUser
);

// Delete user by ID
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
