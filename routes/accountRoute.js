/***************************
 * Account Route File
 * UNiT 4, login view activity
 *****************************/
// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");

// Deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//Unit 5 account update view
router.get(
  "/update",
  utilities.handleErrors(accountController.buildUpdateView)
);

// registration route
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountManagement)
);

router.get(
  "/logged",
  utilities.handleErrors(accountController.buildAccountManagement)
);

router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
