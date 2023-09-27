/*jslint es6 */
const Router = require("express");
const router = new Router();
const bcrypt = require("bcrypt"); 
const pool = require("../config/database");
const validatePassword = require("../validation/passwordValidation");

router.put('/changepassword', async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
    const result = await validatePassword(id, oldPassword);
    if (result.error) {
        return res.status(result.status).json({ message: result.error });
    }
    const saltRounds = 10;
    try {
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await pool.query('UPDATE user_table SET password = $1 WHERE id = $2', [hashedNewPassword, id]);

        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
