import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 8,
      max: 15,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/profile.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
