import { Router } from "express";
import orderModel from "../models/order.model.js";


const pageRouter = Router();

// Home Route
pageRouter.get("/", (req, res) => {
  res.render("index");
});

// User Authentication Routes
pageRouter.get("/users/login", (req, res) => {
  res.render("auth/login", { error: null, message: null });
});

pageRouter.get("/users/register", (req, res) => {
  res.render("auth/register", { error: null, message: null });
});

pageRouter.get("/users/forgot-password", (req, res) => {
  res.render("auth/forgot-password", { error: null, message: null });
});

pageRouter.get("/users/reset-password", (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.redirect("/users/login");
  }
  res.render("auth/reset-password", {
    error: null,
    message: null,
    token,
  });
});


pageRouter.get("/orders/show",  async (req, res) => {
  try {
    // Foydalanuvchi buyurtmalarini olish
    const orders = await orderModel.find({ user: req.user._id }).populate("cloth");

    if (!orders || orders.length === 0) {
      return res.render("orders/show", {
        orders: [],
        message: "Savatda hech qanday buyurtma yo'q.",
      });
    }

    // Savatdagi buyurtmalarni ko'rsatish
    res.render("orders/show", {
      orders,
      message: null,
    });
  } catch (error) {
    console.error("Buyurtmalarni olishda xato:", error);
    res.status(500).render("orders/show", {
      orders: [],
      message: "Buyurtmalarni olishda muammo yuz berdi. Iltimos, keyinroq qaytib keling.",
    });
  }
});

export default pageRouter;
