// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");
const accountController = require("../controllers/accountController");

router.use(utilities.checkLoggedIn);

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build detail view
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildDetailView)
);

/**********************************************/
//UNIT 5 DELETE
// Route to deliver the delete confirmation view
router.get(
  "/delete/:inv_id",
  utilities.authorizeAdminOrEmployee,
  utilities.handleErrors(invController.deleteView)
);
/**********************************************/
// Process the delete controler request
router.post(
  "/delete",
  utilities.authorizeAdminOrEmployee,
  utilities.handleErrors(invController.deleteItem)
);

// Route to intentionally generate a server error
router.get("/trigger-error", (req, res, next) => {
  const err = new Error("This is an intentional 500 error for testing");
  err.status = 500;
  next(err);
});

// Route to build the management view
router.get(
  "/",
  utilities.authorizeAdminOrEmployee,
  utilities.handleErrors(invController.buildManagement)
);

// Route to build add-clasiffication
router.get(
  "/add-classification",
  utilities.authorizeAdminOrEmployee,
  utilities.handleErrors(invController.buildAddClassificationView)
);

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
  utilities.authorizeAdminOrEmployee,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification) //
);

router.post(
  "/add-inventory",
  utilities.authorizeAdminOrEmployee,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory) //
);

// Route to build add-inventory
router.get(
  "/add-inventory",
  utilities.authorizeAdminOrEmployee,
  utilities.handleErrors(invController.buildAddInventory)
);

module.exports = router;
