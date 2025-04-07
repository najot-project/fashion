import mongoose from "mongoose";
import { ROLES } from "../constants/role.constants.js";

const { Schema, SchemaTypes } = mongoose;

const ClothesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
    },
    price: {
      type: Number,
      required: [true, "Kiyim narxi berilishi shart"],
      min: [0, "Narx manfiy bo'lishi mumkin emas"],
    },
    description: {
      type: String,
      required: false,
      maxlength: 1000,
    },
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],
    colors: [
      {
        type: String,
        trim: true,
      },
    ],
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    role: {
      type: String,
      enum: [ROLES.VIEWER, ROLES.STORE_OWNER, ROLES.SUPER_ADMIN],
      default: ROLES.STORE_OWNER,
    },

    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "clothes",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Clothes", ClothesSchema);
