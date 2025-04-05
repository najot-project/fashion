import express from "express";
import route from "./routers/index.js";
import { config } from "dotenv";
import { join } from "node:path";
import { BaseException } from "./utils/exception.js";
import { ErrorHandlerMiddleware } from "./middlewares/error.middleware.js";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(join(process.cwd(), "uploads")));

app.use("/api", route);

app.all("/*", (req, res, next) => {
  try {
    throw new BaseException(
      `Given ${req.url} with method: ${req.method} not found`,
      404
    );
  } catch (error) {
    next(error);
  }
});

app.use(ErrorHandlerMiddleware);

export default app;