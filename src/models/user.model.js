import Joi from "joi";

export const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  phoneNumber: Joi.string().pattern(/^\+998\d{9}$/).required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().valid("male", "female").required(),
  birthDate: Joi.date().less("now").required(),
});

export const loginUserSchema = Joi.object({
  phoneNumber: Joi.string().pattern(/^\+998\d{9}$/).required(),
  password: Joi.string().min(8).required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
  password: Joi.string().min(8),
  gender: Joi.string().valid("male", "female"),
  birthDate: Joi.date().less("now"),
});
