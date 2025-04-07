import { isValidObjectId } from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  ACCESS_TOKEN_SECRET,
  generateToken,
} from "../config/jwt.config.js";
import { sendMail } from "../utils/mail.utils.js";


// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: ACCESS_TOKEN_EXPIRE_TIME * 1000,
  sameSite: "strict",
};

// Register Controller
const register = async (req, res, next) => {
  try {
    const { name, phoneNumber, password, birthDate, gender, role, email } = req.body;

    if (!name || !phoneNumber || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this phone number" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      phoneNumber,
      password: passwordHash,
      birthDate,
      gender,
      role: role || "VIEWER",
      email,
    });

    await newUser.save();

    const token = generateToken(
      newUser._id,
      newUser.phoneNumber,
      newUser.role,
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRE_TIME
    );

    res.cookie("access_token", token, cookieOptions);

    // Send Welcome Email
    await sendMail({
      to: newUser.email,
      subject: "Xush kelibsiz!",
      html: `Salom, ${newUser.name},Sizni ro'yhatdan o'tganingiz bilan tabriklaymiz!`,
    });

    res.status(201).json({
      message: "User registered successfully and welcome email sent",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Login Controller
const login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Phone number and password are required" });
    }

    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.phoneNumber, user.role);
    res.cookie("access_token", token, cookieOptions);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Logout Controller
const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Get All Users Controller
const getAllUsers = async (_, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ data: users, message: "All users fetched successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Get One User Controller
const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: `Given user ID: ${id} is not valid` });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID: ${id} not found` });
    }

    res.status(200).json({ data: user, message: "User fetched successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update User Controller
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: `Given user ID: ${id} is not valid` });
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: `User with ID: ${id} not found` });
    }

    res.status(200).json({ data: updatedUser, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Delete User Controller
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: `Given user ID: ${id} is not valid` });
    }

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `User with ID: ${id} not found` });
    }

    res.status(200).json({ data: deletedUser, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
};
