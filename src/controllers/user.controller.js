import { isValidObjectId } from "mongoose";
import userModel from "../models/user.model.js";


const getAllUsers = async (_, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ data: users, message: "All users fetched successfully" });
        console.log("dhhdh");
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneUser = async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: `Given user ID: ${id} is not valid` });
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: `User with ID: ${id} not found` });
        }

        res.status(200).json({ data: updatedUser, message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
};

export default { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
