import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import walletRoutes from "./routes/walletRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/admin/wallet", walletRoutes);
app.use("/orders", orderRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});