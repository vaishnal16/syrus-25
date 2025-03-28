const BusinessLoan = require("../models/BusinessLoan");

// Submit Business Loan Application
exports.submitBusinessLoan = async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      yearsFounded,
      annualRevenue,
      loanAmount,
      duration,
      description,
      sustainabilityGoals,
    } = req.body;

    // Create new loan application
    const newLoan = new BusinessLoan({
      businessName,
      businessType,
      yearsFounded,
      annualRevenue,
      loanAmount,
      duration,
      description,
      sustainabilityGoals,
    });

    await newLoan.save();
    
    res.status(201).json({
      message: "Business loan application submitted successfully!",
      data: newLoan,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Fetch all business loan applications
exports.getBusinessLoans = async (req, res) => {
  try {
    const loans = await BusinessLoan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
