import { Router } from "express";
import userRouter from "./user.route.js";

const route = Router();

route.use("/users", userRouter);

export default route;
