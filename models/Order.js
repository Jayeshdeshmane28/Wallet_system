import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  clientId: String,
  amount: Number,
  status: {
    type: String,
    default: "CREATED"
  },
  fulfillmentId: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);