import Joi from "joi";

export const registerUserSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phoneNumber: Joi.string().pattern(/^\+998\d{9}$/).required(),
  gender: Joi.string().valid("male", "female").required(),
  birthDate: Joi.date().less("now").required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const updateUserSchema = Joi.object({
  fullName: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
  password: Joi.string().min(8),
});