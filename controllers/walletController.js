import Wallet from "../models/Wallet.js";
import Ledger from "../models/Ledger.js";

export const creditWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body;

    const wallet = await Wallet.findOneAndUpdate(
      { clientId: client_id },
      { $inc: { balance: amount } },
      { new: true, upsert: true }
    );

    await Ledger.create({
      clientId: client_id,
      amount,
      type: "CREDIT"
    });

    res.json(wallet);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const debitWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body;

    const wallet = await Wallet.findOne({ clientId: client_id });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    wallet.balance -= amount;
    await wallet.save();

    await Ledger.create({
      clientId: client_id,
      amount,
      type: "DEBIT"
    });

    res.json(wallet);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBalance = async (req, res) => {
  try {

    const clientId = req.headers["client-id"];

    const wallet = await Wallet.findOne({ clientId });

    res.json({
      balance: wallet?.balance || 0
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};