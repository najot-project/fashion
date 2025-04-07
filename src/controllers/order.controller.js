import { BaseException } from "../exception/base.exception.js";
import Order from "../models/order.model.js";
import Clothes from "../models/clothes.model.js";

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("userId", "_id username")
      .populate("orderItems.clothesId", "name price");

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      userId: order.userId,
      orderItems: order.orderItems.map((item) => ({
        clothesId: item.clothesId,
        count: item.count,
      })),
      total_price: order.total_price,
      createdAt: order.createdAt,
    }));

    res.status(200).json({ message: "Success", orders: formattedOrders });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "_id username")
      .populate("orderItems.clothesId", "name price");

    if (!order) {
      throw new BaseException(`Order is not found`);
    }

    const formattedOrder = {
      _id: order._id,
      userId: order.userId,
      orderItems: order.orderItems.map((item) => ({
        clothesId: item.clothesId,
        count: item.count,
      })),
      total_price: order.total_price,
      createdAt: order.createdAt,
    };

    res.status(200).json({ message: "Success", order: formattedOrder });
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

    // Clothes modelidan narxlarni olish
    const clothesIds = orderItems.map((item) => item.clothesId);
    const clothes = await Clothes.find({ _id: { $in: clothesIds } });

    if (clothes.length !== orderItems.length) {
      throw new BaseException(`Some clothes items were not found`);
    }

    // Total_price ni hisoblash
    const total_price = orderItems.reduce((sum, item) => {
      const cloth = clothes.find((c) => c._id.toString() === item.clothesId);
      return sum + cloth.price * item.count;
    }, 0);

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

    // Agar orderItems yangilansa, total_price ni qayta hisoblash
    if (updateData.orderItems) {
      const clothesIds = updateData.orderItems.map((item) => item.clothesId);
      const clothes = await Clothes.find({ _id: { $in: clothesIds } });

      if (clothes.length !== updateData.orderItems.length) {
        throw new BaseException(`Some clothes items were not found`);
      }

      updateData.total_price = updateData.orderItems.reduce((sum, item) => {
        const cloth = clothes.find((c) => c._id.toString() === item.clothesId);
        return sum + cloth.price * item.count;
      }, 0);
    }

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