const mongoose = require("mongoose");

const businessLoanSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  yearsFounded: { type: Number, required: true },
  annualRevenue: { type: Number, required: true },
  loanAmount: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  sustainabilityGoals: { type: String, required: false }, // Optional
}, { timestamps: true });

module.exports = mongoose.model("BusinessLoan", businessLoanSchema);
