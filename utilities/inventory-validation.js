const { body, validationResult } = require("express-validator");
const utilities = require(".");
const invValidate = {};

/* **********************************
 *  Classification Data Validation Rules
 * ********************************* */
invValidate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty()
      .withMessage("Classification name is required.")
      .matches(/^[A-Za-z]+$/)
      .withMessage(
        "Classification name must contain only letters (no spaces or special characters)."
      )
      .isLength({ max: 30 })
      .withMessage("Classification name must not exceed 30 characters."),
  ];
};

/* **********************************
 *  Check Classification Data and Return Errors or Continue
 * ********************************* */
invValidate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors: errors.array(),
      title: "Add Classification to Inventory",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

/* **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
invValidate.inventoryRules = () => {
  return [
    // Classification must be selected
    body("classification_id")
      .trim()
      .notEmpty()
      .withMessage("Please select a classification."),

    // Vehicle Make
    body("inv_make")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Vehicle make must be at least 2 characters."),

    // Vehicle Model
    body("inv_model")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Vehicle model is required."),

    // Price
    body("inv_price")
      .trim()
      .notEmpty()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),

    // Year
    body("inv_year")
      .trim()
      .notEmpty()
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Year must be a valid year."),

    // Mileage
    body("inv_miles")
      .trim()
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage("Mileage must be a positive integer."),

    // Color
    body("inv_color").trim().notEmpty().withMessage("Color is required."),
  ];
};

/* **********************************
 *  Check inventory data and return errors or continue
 * ********************************** */
invValidate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList(
      req.body.classification_id
    );
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationSelect,
      errors,
      ...req.body, // sticky fields
    });
  }
  next();
};

module.exports = invValidate;
