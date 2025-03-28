import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { VolidationMiddleware } from "../middleware/validation.middleware.js";
import { userSchema } from "../schema/user.schema.js";

const userRouter = Router();

userRouter
.get("/",UserController.getAllUsers)
.get("/:id",UserController.getOneUser)
.post("/",VolidationMiddleware(userSchema),UserController.createUser)
.put("/:id", VolidationMiddleware(userSchema), UserController.updateUser)
.delete("/:id", UserController.deleteUser)

export default userRouter;