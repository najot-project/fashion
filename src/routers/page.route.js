import { Router } from "express";
import orderModel from "../models/order.model.js";


const pageRouter = Router();

pageRouter.get("/", (req, res) => {
    res.render("index");
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
