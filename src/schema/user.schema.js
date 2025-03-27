import Joi from "joi";

export const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().pattern(/^\+?\d{10,15}$/).required(),
    password: Joi.string().min(8).required(),
    createdAt: Joi.date().default(() => new Date(), "current date"),
    updatedAt: Joi.date().default(() => new Date(), "current date"),
});
