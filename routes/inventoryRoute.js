// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build detail view
router.get("/detail/:inv_id", invController.buildDetailView);

// Route to intentionally generate a server error
router.get("/trigger-error", (req, res, next) => {
  const err = new Error("This is an intentional 500 error for testing");
  err.status = 500;
  next(err);
});

module.exports = router;
