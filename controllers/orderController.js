import Wallet from "../models/Wallet.js";
import Order from "../models/Order.js";
import axios from "axios";

export const createOrder = async (req, res) => {

  try {

    const clientId = req.headers["client-id"];
    const { amount } = req.body;

    const wallet = await Wallet.findOne({ clientId });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    wallet.balance -= amount;
    await wallet.save();

    const order = await Order.create({
      clientId,
      amount
    });

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: clientId,
        title: order._id
      }
    );

    order.fulfillmentId = response.data.id;
    order.status = "FULFILLED";

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


export const getOrder = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};