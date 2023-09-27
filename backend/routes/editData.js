/*jslint es6 */
const express = require("express");
const router = express.Router();

const pool = require('../config/database');


//edit user data
router.put('/editdata', async (req, res) => {
    try {
      const { firstname, secondname, email, phone, id } = req.body;

      const update =async()=>{
        await pool.query(
          "UPDATE user_table SET first_name = $1, last_name = $2, email = $3, phone_number= $4 WHERE id = $5",
          [firstname, secondname, email, phone,id]
        );
        res.status(200).json({ message: 'Profile updated successfully' });
      } 
      function validateEmail(email) {
        var emailPattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.com$/;
        return emailPattern.test(email);
      }
      function validatePhone(phone) {
        var phonePattern = /^\d{10}$/;
        return phonePattern.test(phone);
      }
//validate phone number
      if (!validatePhone(phone)) {
        res.status(201).json({message:'invalid phone'})
       }
//validate email
      if (!validateEmail(email)) {
        res.status(201).json({message:'invalid email'})
      }
// both      
      if(validatePhone(phone)&&validateEmail(email)){
        update();
      }
      
    } catch (error) {
      console.error('Error updating profile data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
