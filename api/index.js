import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB is Connected"));

const app = express();

app.listen(3000, () => {
  console.log("Api Server running on port 3000");
});
