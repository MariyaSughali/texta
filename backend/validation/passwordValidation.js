/*jslint es6 */
/*jslint node*/
const bcrypt = require('bcrypt');
const pool = require('../config/database');

async function validatePassword(id, oldPassword) {
    "use strict";
    try {
        const userResult = await pool.query('SELECT password FROM user_table WHERE id = $1', [id]);
        const user = userResult.rows[0];
        if (!user) {
            return { error: 'User not found', status: 404 };
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return { error: 'Invalid old password', status: 401 };
        }

        return { message: 'Password updated successfully', status: 200 };
    } catch (error) {
        return { error: 'Internal server error', status: 500 };
    }
}

module.exports = validatePassword;
