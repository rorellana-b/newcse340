const pool = require("../database/");

/*********************************
 * GET ALL THE CLASIFICATION DATA
 **********************************/
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

module.exports = { getClassifications };
