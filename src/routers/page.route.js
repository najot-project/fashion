import { Router } from "express";
import clothesModel from "../models/clothes.model";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
    res.render("index");
});

pageRouter.get("/users/login", (req, res) => {
    res.render("login");
});

pageRouter.get("/users/register", (req, res) => {
    res.render("register");
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
