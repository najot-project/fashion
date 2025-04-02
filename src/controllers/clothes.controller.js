import { isValidObjectId } from "mongoose";
import categoryModel from "../models/category.model.js";
import clothesModel from "../models/clothes.model.js";

const getAllClothes = async (req, res) => {
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
    res.status(500).send({
      message: "Error while fetching clothes",
      error: error.message,
    });
  }
};

const getOneClothes = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).send({
        message: `Given ID: ${id} is not a valid Object ID`,
      });
    }

    const clothes = await clothesModel
      .findById(id)
      .populate("category", "-clothes -createdAt -updatedAt")
      .select(["-createdAt", "-updatedAt"]);

    if (!clothes) {
      return res.status(404).send({
        message: "Clothes not found",
      });
    }

    res.send({
      message: "success",
      data: clothes,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while fetching the clothes",
      error: error.message,
    });
  }
};

const createClothes = async (req, res) => {
  const { name, price, category, description, imageUrl } = req.body;

  try {
    const foundedCategory = await categoryModel.findById(category);

    if (!foundedCategory) {
      return res.status(404).send({
        message: `Category with ID: ${category} not found`,
      });
    }

    const clothes = await clothesModel.create({
      name,
      price,
      category,
      description,
      imageUrl,
    });

    await categoryModel.updateOne(
      { _id: category },
      {
        $push: {
          clothes: clothes._id,
        },
      }
    );

    res.status(201).send({
      message: "Clothes created successfully",
      data: clothes,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while creating clothes",
      error: error.message,
    });
  }
};

const updateClothes = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).send({
        message: `Given ID: ${id} is not a valid Object ID`,
      });
    }

    const clothes = await clothesModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
      },
      { new: true }
    );

    if (!clothes) {
      return res.status(404).send({
        message: "Clothes not found",
      });
    }

    res.send({
      message: "Clothes updated successfully",
      data: clothes,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while updating clothes",
      error: error.message,
    });
  }
};

const deleteClothes = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).send({
        message: `Given ID: ${id} is not a valid Object ID`,
      });
    }

    const result = await clothesModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: "Clothes not found",
      });
    }

    res.status(204).send({
      message: "Clothes deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while deleting clothes",
      error: error.message,
    });
  }
};

export default { getAllClothes, getOneClothes, createClothes, updateClothes, deleteClothes };
