import Joi from "joi";

export const createOrderSchema = Joi.object({
  userId: Joi.string().length(24).required(), 
  orderItems: Joi.array()
    .items(
      Joi.object({
        clothesId: Joi.string().length(24).required(), 
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
      })
    )
    .min(1) 
    .required(),
  total_price: Joi.number().positive().required(),
});

export const updateOrderSchema = Joi.object({
  userId: Joi.string().length(24),
  orderItems: Joi.array().items(
    Joi.object({
      clothesId: Joi.string().length(24),
      quantity: Joi.number().integer().min(1),
      price: Joi.number().positive(),
    })
  ),
  total_price: Joi.number().positive(),
  status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled'),
});
