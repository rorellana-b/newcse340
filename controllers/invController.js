const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build Detail by classification view
 * ************************** */
invCont.buildDetailView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  const data = await invModel.getVehicleById(inv_id);

  const nav = await utilities.getNav();
  const vehicleHTML = utilities.buildVehicleDetailHTML(data);
  res.render("inventory/detail", {
    title: `${data.inv_year} ${data.inv_make} ${data.inv_model}`,
    nav,
    vehicleHTML,
  });
};

/* ***************************
 *  Build Managment view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    classificationSelect,
  });
};

/*******************************
 * Build Add inventory View
 *******************************/
invCont.buildAddClassificationView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification to Inventory",
      nav,
      // errors: null,
      // classification_name: "",
      // flash: null,
    });
  } catch (error) {
    next(error);
  }
};

/*******************************
 * Build Add inventory View
 *******************************/
invCont.buildAddInventory = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList();
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationSelect,
      errors: null,
      flash: null,
    });
  } catch (error) {
    next(error);
  }
};

/*******************************
 * Process Add Classification
 *******************************/
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;

  try {
    // Inserción en BD
    const regResult = await invModel.registerClassification(
      classification_name
    );

    if (regResult) {
      req.flash(
        "notice",
        `Classification "${classification_name}" added successfully.`
      );
      const nav = await utilities.getNav();
      res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
      });
    } else {
      const nav = await utilities.getNav();
      req.flash("notice", "Sorry, the insertion failed.");
      res.status(500).render("inventory/add-classification", {
        title: "Add Classification to Inventory",
        nav,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Form to add new car to inventory
invCont.addInventory = async function (req, res, next) {
  try {
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    } = req.body;

    // Insertar en BD
    const regResult = await invModel.registerInventory({
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    });

    if (regResult) {
      req.flash(
        "notice",
        `Vehicle "${inv_make} ${inv_model}" added successfully.`
      );
      const nav = await utilities.getNav();
      res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
      });
    } else {
      const nav = await utilities.getNav();
      req.flash("notice", "Sorry, the insertion failed.");
      res.status(500).render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationSelect: await utilities.buildClassificationList(),
      });
    }
  } catch (error) {
    next(error);
  }
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  );
  if (invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
};

module.exports = invCont;
