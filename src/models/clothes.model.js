import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    price: {
      type: mongoose.SchemaTypes.Number,
      required: [true, "Kiyim narxi berilishi shart"],
      min: 0
    },
    description: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    imageUrl: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
  },
  {
    collection: "clothes",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Clothes", ClothesSchema);
