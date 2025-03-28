import { Router } from "express";
import userRouter from "./user.route.js";
import categoryRouter from "./category.route.js";
import clothesRouter from "./clothes.route.js";

const route = Router();

route
.use("/users", userRouter)
.use("/categories", categoryRouter)
.use("/clothes", clothesRouter)

export default route;
