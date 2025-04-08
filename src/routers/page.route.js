import { Router } from "express";
import clothesModel from "../models/clothes.model";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
    res.render("index");
});

// 📦 Barcha buyurtmalar sahifasi
pageRouter.get("/orders", async (req, res, next) => {
    try {
      const orders = await orderModel.find().populate({
        path: "orderItems",
        populate: "clothes", // har bir buyurtma item uchun kymni olib kelish
      });
      res.render("orders/index", { orders });
    } catch (error) {
      next(error);
    }
  });
  
  // ➕ Yangi buyurtma yaratish sahifasi
  pageRouter.get("/orders/create", async (req, res, next) => {
    try {
      const clothes = await clothesModel.find(); 
      res.render("orders/create", { clothes });
    } catch (error) {
      next(error);
    }
  });
  
  // 🔍 Bitta buyurtma tafsiloti sahifasi
  pageRouter.get("/orders/:id", async (req, res, next) => {
    try {
      const order = await orderModel.findById(req.params.id).populate({
        path: "orderItems",
        populate: "clothes",
      });
  
      if (!order) {
        return res.status(404).send("Buyurtma topilmadi");
      }
  
      res.render("orders/show", { order });
    } catch (error) {
      next(error);
    }
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