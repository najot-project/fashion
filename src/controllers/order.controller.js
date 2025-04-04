import { BaseException } from "../exception/base.exception.js";
import Order from "../models/order.model.js";

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("userId orderItems.clothesId");
    res.status(200).json({ message: "Success", orders });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId orderItems.clothesId");
    if (!order) {
      throw new BaseException(`Order is not found`);
    }

    res.status(200).json({ message: "Success", order });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { userId, orderItems } = req.body;

    if (!userId || !orderItems || orderItems.length === 0) {
      throw new BaseException(`All fields (userId, orderItems) must be provided`);
    }

    let total_price = 0;
    for (const item of orderItems) {
      total_price += item.quantity * item.price; 
    }

    const newOrder = new Order({
      userId,
      orderItems,
      total_price,
    });

    await newOrder.save();

    res.status(201).json({ message: "Success", newOrder });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      throw new BaseException(`Order is not found`);
    }

    res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      throw new BaseException(`Order is not found`);
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const orderController = { getOrders, createOrder, getOrderById, updateOrder, deleteOrder };
export default orderController;