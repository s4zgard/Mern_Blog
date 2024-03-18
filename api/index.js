import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB is Connected"));

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Api Server running on port 3000");
});
