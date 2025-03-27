import { isValidObjectId } from "mongoose";
import categoryModel from "../models/category.model.js";
import clothesModel from "../models/clothes.model.js";

const getAllClothes = async (req, res) => {
  const clothes = await clothesModel
    .find()
    .populate("category", "-clothes -createdAt -updatedAt")
    .select(["-createdAt", "-updatedAt"]);

  res.send({
    message: "success",
    count: clothes.length,
    data: clothes,
  });
};

const getOneClothes = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).send({
      message: `Given ID: ${id} is not valid Object ID`,
    });
  }

  const clothes = await clothesModel
    .findById(id)
    .populate("category", "-clothes -createdAt -updatedAt")
    .select(["-createdAt", "-updatedAt"]);

  res.send({
    message: "success",
    data: clothes,
  });
};

const createClothes = async (req, res) => {
  const { name, price, category, description, imageUrl } = req.body;

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
    message: "success",
    data: clothes,
  });
};

const updateClothes = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).send({
      message: `Given ID: ${id} is not valid Object ID`,
    });
  }

  const clothes = await clothesModel.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
    },
    {
      new: true,
    }
  );

  res.send({
    message: "yangilandi",
    data: clothes,
  });
};

const deleteClothes = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).send({
      message: `Given ID: ${id} is not valid Object ID`,
    });
  }

  await clothesModel.deleteOne({ _id: id });

  res.status(204).send();
};

export default { getAllClothes, getOneClothes, createClothes, updateClothes, deleteClothes };
