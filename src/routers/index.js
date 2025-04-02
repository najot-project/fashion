import { Router } from "express";
import userRouter from "./user.route.js";
import categoryRouter from "./category.route.js";
import clothesRouter from "./clothes.route.js";
import { errorHandler } from "../middleware/error.middleware.js";

const route = Router();

route
  .use("/users", userRouter)
  .use("/categories", categoryRouter)
<<<<<<< HEAD
  .use("/clothes", clothesRouter)
  .use(errorHandler);
=======
  .use("/clothes", clothesRouter);
>>>>>>> 855b2020abc59a1dfc9d6bb5e004979f82f341aa

export default route;
