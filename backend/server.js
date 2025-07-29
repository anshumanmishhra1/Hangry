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

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// ✅ CORS Setup for Multiple Allowed Origins
const allowedOrigins = [
  "https://hangryfood.onrender.com",
  "https://food-del-frontend-k60s.onrender.com",
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

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/razor", razorpayRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

// YOU CAN SAVE UR DATABASE IN THIS COMMENT IF U WANT -->
