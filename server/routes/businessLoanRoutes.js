const express = require("express");
const {
  submitBusinessLoan,
  getBusinessLoans,
} = require("../controllers/businessLoanController");

const router = express.Router();

router.post("/submit-business-loan", submitBusinessLoan);
router.get("/get-business-loans", getBusinessLoans);

module.exports = router;
