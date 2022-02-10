const Transaction = require("../models/TransactionModel");

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// #access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};

// @desc    Add all transactions
// @route   POST /api/v1/transactions
// #access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// #access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    res.status(200).json({
      succes: true,
      data: { id: req.params.id },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};
