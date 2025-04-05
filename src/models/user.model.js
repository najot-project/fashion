import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
      match:
        /^(9[012345789]|6[125679]|7[01234569]|3[3]|8[8]|2[0]|5[05])[0-9]{7}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.VIEWER, ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN],
      default: ROLES.VIEWER,
    },
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
