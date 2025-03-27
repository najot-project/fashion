import { Router } from "express";
import userRouter from "./user.route.js";
import categoryRouter from "./category.route.js";

const route = Router();

route
.use("/users", userRouter)
.use("/categories", categoryRouter)

export default route;
