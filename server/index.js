import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { postLogin, postSignup } from "./controllers/user.js";
import { postBlogs, getBlogs } from "./controllers/blog.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running...",
  });
});

app.post("/signup", postSignup);
app.post("/login", postLogin);
app.get("/blogs", getBlogs);
app.post("/blogs", postBlogs);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
