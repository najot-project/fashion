import { Router } from "express";
import orderModel from "../models/order.model.js";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
  res.render("index");
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
