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
  
  pageRouter.get("/orders/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
      const order = await orderModel.findById(id).populate("items.product");
      if (!order) {
        return res.status(404).render("orders/show", {
          order: null, 
          error: "Buyurtma topilmadi",
          success: null,
        });
      }
  
      res.render("orders/show", {
        order,
        error: null,
        success: null,
      });
    } catch (err) {
      console.error(err);
      res.status(500).render("orders/show", {
        order: null, 
        error: "Xatolik yuz berdi", 
        success: null,
      });
    }
  });
  
  
export default pageRouter;
