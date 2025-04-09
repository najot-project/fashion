import { Router } from "express";
import orderModel from "../models/order.model.js";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
  res.render("index");
});

pageRouter.get("/users/login", (req, res) => {
  res.render("auth/login", { error: null });
});

pageRouter.get("/users/register", (req, res) => {
  res.render("auth/register", { error: null });
});

pageRouter.get("/users/forgot-password", (req, res) => {
  res.render("auth/forgot-password", { error: null, message: null });
});

pageRouter.get("/users/reset-password", (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.redirect("/users/login");
  }
  res.render("auth/reset-password", {
    error: null,
    message: null,
    token,
  });
});

pageRouter.get("/orders", (req, res) => {
  res.render("orders/index", {
    orders: [],
    error: null,
    success: null,
  });
});

pageRouter.get("/orders/create", (req, res) => {
  res.render("orders/create", {
    clothes: [],
    error: null,
    success: null,
  });
});

pageRouter.get("/orders/:id", (req, res) => {
  const order = null; // keyinchalik DB'dan olib kelinadi
  res.render("orders/show", {
    order,
    error: null,
    success: null,
  });
});

export default pageRouter;
