import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; 
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import razorpayRouter from './routes/razorpayRoutes.js';
import cookieParser from "cookie-parser";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Setup for Multiple Allowed Origins
const allowedOrigins = [
  "https://hangryfood.onrender.com",
  "https://food-del-frontend-k60s.onrender.com",
  "http://localhost:5173",  // (optional for local dev)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// DB connection
connectDB();

// Static file serving
app.use("/images", express.static('uploads'));

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/razor", razorpayRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
