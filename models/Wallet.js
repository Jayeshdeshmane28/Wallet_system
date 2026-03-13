import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Wallet", walletSchema);