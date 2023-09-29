/*jslint es6 */

const express = require("express");
const router = express.Router();
const pool = require('../config/database');

//get user data from db
router.get('/account',async (req, res) => {
      const result = await pool.query("SELECT * FROM user_table JOIN language ON user_table.language_id = language.language_id JOIN role ON user_table.role_id = role.role_id");
      res.json(result.rows);
  });

module.exports = router;