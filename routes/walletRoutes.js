import express from "express";

import {
  creditWallet,
  debitWallet,
  getBalance
} from "../controllers/walletController.js";

import { clientAuth } from "../middleware/clientAuth.js";

const router = express.Router();

router.post("/credit", creditWallet);
router.post("/debit", debitWallet);

router.get("/balance", clientAuth, getBalance);

export default router;