// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");
const accountController = require("../controllers/accountController");

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

// Route to build the management view
router.get("/", invController.buildManagement);

// Route to build add-clasiffication
router.get("/add-classification", invController.buildAddClassificationView);

// Account route Unit 5
router.get(
  "/",
  utilities.checkJWTToken,
  utilities.handleErrors(accountController.buildAccountManagement)
);

router.get(
  "/getInventory/:classification_id",
  utilities.checkJWTToken,
  utilities.handleErrors(invController.getInventoryJSON)
);

router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification) //
);

router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory) //
);

// Route to build add-inventory
router.get("/add-inventory", invController.buildAddInventory);

module.exports = router;
