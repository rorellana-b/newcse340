const pool = require("../database/");

/*********************************
 * GET ALL THE CLASIFICATION DATA
 **********************************/
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

async function getVehicleById(inv_id) {
  try {
    const result = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("getVehicleById error " + error);
  }
}

/************************
 * Register New Classification
 ************************/
async function registerClassification(classification_name) {
  try {
    const sql =
      "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

/************************
 * Adding a new vehicle to inventory
 ************************/

async function registerInventory(vehicleData) {
  try {
    const sql = `INSERT INTO inventory
      (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING inv_id`;

    const values = [
      vehicleData.classification_id,
      vehicleData.inv_make,
      vehicleData.inv_model,
      vehicleData.inv_description,
      vehicleData.inv_image,
      vehicleData.inv_thumbnail,
      vehicleData.inv_price,
      vehicleData.inv_year,
      vehicleData.inv_miles,
      vehicleData.inv_color,
    ];

    const result = await pool.query(sql, values);
    return result.rowCount === 1;
  } catch (error) {
    console.error("Error inserting inventory:", error);
    return false;
  }
}

/*********************************************
 * Delete inventory item Unit 5
 ******************************************/
async function deleteInventoryItem(inv_id) {
  try {
    const sql = "DELETE FROM inventory WHERE inv_id = $1";
    const data = await pool.query(sql, [inv_id]);
    return data;
  } catch (error) {
    new Error("Sorry, the delete failed.");
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById,
  registerClassification,
  registerInventory,
  deleteInventoryItem,
};
