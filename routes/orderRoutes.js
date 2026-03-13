import express from "express";
import {
  createOrder,
  getOrder
} from "../controllers/orderController.js";

import { clientAuth } from "../middleware/clientAuth.js";

const router = express.Router();

router.post("/", clientAuth, createOrder);
router.get("/:id", clientAuth, getOrder);

export default router;