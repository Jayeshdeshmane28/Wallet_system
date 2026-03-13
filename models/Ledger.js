import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  clientId: String,
  amount: Number,
  type: {
    type: String,
    enum: ["CREDIT", "DEBIT"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Ledger", ledgerSchema);