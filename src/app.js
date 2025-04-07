import express from "express";
import route from "./routers/index.js";
import { config } from "dotenv";
import path from 'path';
import cookieParser from 'cookie-parser'
import pageRouter from "./routers/page.route.js";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use("/uploads", express.static("uploads"));

app.use(cookieParser("cookie-secret"));

app.use("/", pageRouter)
app.use("/api", route);

app.all("/*", (req, res) => {
  res.status(404).send({
    message: `Given ${req.url} with method: ${req.method} not found`,
  });
});

export default app;
