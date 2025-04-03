import { isValidObjectId } from "mongoose";
import categoryModel from "../models/category.model.js";
import clothesModel from "../models/clothes.model.js";
import { BaseException } from "../exception/base.exception.js";

const getAllClothes = async (req, res, next) => {
  try {
    const clothes = await clothesModel
      .find()
      .populate("category", "-clothes -createdAt -updatedAt")
      .select(["-createdAt", "-updatedAt"]);

    res.send({
      message: "success",
      count: clothes.length,
      data: clothes,
    });
  } catch (error) {
    next(error);
  }
};

const getOneClothes = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new BaseException(`Given ID: ${id} is not valid Object ID`, 400);
    }

    const clothes = await clothesModel
      .findById(id)
      .populate("category", "-clothes -createdAt -updatedAt")
      .select(["-createdAt", "-updatedAt"]);

    if (!clothes) {
      throw new BaseException("Clothes not found", 404);
    }

    res.send({
      message: "success",
      data: clothes,
    });
  } catch (error) {
    next(error);
  }
};

const createClothes = async (req, res, next) => {
  try {
    const { name, price, category, description, imageUrl, size } = req.body;

    const foundedCategory = await categoryModel.findById(category);
    if (!foundedCategory) {
      throw new BaseException(`Category with ID: ${category} not found`, 400);
    }

    const clothes = await clothesModel.create({
      name,
      price,
      category,
      description,
      imageUrl,
      size,
    });

    await categoryModel.updateOne(
      { _id: category },
      { $push: { clothes: clothes._id } }
    );

    res.status(201).send({
      message: "success",
      data: clothes,
    });
  } catch (error) {
    next(error);
  }
};

const updateClothes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, size } = req.body;

    if (!isValidObjectId(id)) {
      throw new BaseException(`Given ID: ${id} is not valid Object ID`, 400);
    }

    const clothes = await clothesModel.findByIdAndUpdate(
      id,
      { name, description, price, size },
      { new: true }
    );

    if (!clothes) {
      throw new BaseException("Clothes not found", 404);
    }

    res.send({
      message: "Clothes updated successfully",
      data: clothes,
    });
  } catch (error) {
    next(error);
  }
};

const deleteClothes = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new BaseException(`Given ID: ${id} is not valid Object ID`, 400);
    }

    const result = await clothesModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new BaseException("Clothes not found", 404);
    }

    await categoryModel.updateOne({ clothes: id }, { $pull: { clothes: id } });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllClothes,
  getOneClothes,
  createClothes,
  updateClothes,
  deleteClothes,
};
