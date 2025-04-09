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
  res.render("auth/reset-password", { error: null, message: null, token });
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

pageRouter.get("/categories", (req, res) => {
    res.render("categories/index")
});

pageRouter.get("/categories/show", (req, res) => {
    res.render("categories/show")
});

pageRouter.get("/categories/create", (req, res) => {
    res.render("categories/create")
});

pageRouter.get("/categories/edit", (req, res) => {
    res.render("categories/edit")
});

pageRouter.get("/orders", async (req, res, next) => {
      res.render("orders/index", { orders });
})
  

  pageRouter.get("/orders/create", async (req, res, next) => { 
      res.render("orders/create", { clothes });
})
  
  pageRouter.get("/orders/:id", async (req, res, next) => {
        const { id } = req.params;
        const order = await orderModel.findById(id);
        res.render("orders/show", { order });
    }
   )

export default pageRouter;
