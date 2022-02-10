const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Please add some text"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a positive or negative number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
