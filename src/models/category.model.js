import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Category", categorySchema);
