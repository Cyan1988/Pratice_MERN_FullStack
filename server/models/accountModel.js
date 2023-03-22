import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },

    subscribe: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("accounts", accountSchema);
