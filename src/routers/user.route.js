import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
import { userSchema } from "../schema/user.schema.js";

const userRouter = Router();

userRouter
.get("/",UserController.getAllUsers)
.get("/:id",UserController.getOneUser)
.post("/",validationMiddleware(userSchema),UserController.createUser)
.put("/:id", validationMiddleware(userSchema), UserController.updateUser)
.delete("/:id", UserController.deleteUser)

export default userRouter;