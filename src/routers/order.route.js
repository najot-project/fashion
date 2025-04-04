import { Router } from "express";
import orderController from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter
    .get("/", Protected(false), orderController.getOrders)
    .get("/:id",Protected(false), orderController.getOrderById)
    .post("/", Protected(true),orderController.createOrder)
    .put("/:id",Protected(true), orderController.updateOrder)
    .delete("/:id",Protected(true), orderController.deleteOrder);

export default orderRouter;

