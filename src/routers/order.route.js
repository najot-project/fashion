import { Router } from "express";
import orderController from "../controllers/order.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createOrderSchema } from "../schema/order.schema.js";

const orderRouter = Router();

orderRouter
    .get("/", orderController.getOrders)
    .get("/:id", orderController.getOrderById)
    .post("/",
        ValidationMiddleware(createOrderSchema),
        orderController.createOrder)
    .put("/:id", orderController.updateOrder)
    .delete("/:id", orderController.deleteOrder);

export default orderRouter;

