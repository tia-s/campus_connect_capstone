const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const mysql = require('mysql2/promise'); // Import mysql2/promise for using promises

require('dotenv').config(); 


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


  exports.getMembers = async () => {
    try {
        const connection = await pool.getConnection();
        const members = await connection.query('SELECT * FROM Member;');
        connection.release();
        return members;
    } catch (err) {
        return{'Error:': err};
    }
  };

  exports.getMember = async (memberID) => {
    try {
        const connection = await pool.getConnection();
        const member = await connection.query(`SELECT * FROM Member WHERE memberID = ${memberID};`);
        connection.release();
        return member;
    } catch (err) {
        return{'Error:': err};
    }
  };

  exports.createMember = async (data) => {
    try {
        const { email, phone, password, firstName, lastName, role, personalityTypeID } = data;
        const connection = await pool.getConnection();
        await connection.query(`INSERT INTO Member (email, phone, password, firstName, lastName, role, personalityTypeID) VALUES (?, ?, ?, ?, ?, ?, ?)`, [email, phone, password, firstName, lastName, role, personalityTypeID]);
        connection.release();
        return {"Success": "Member added."};
    } catch (err) {
        return {'Error:': err};
    }
  };

  exports.updateMember = async (memberID, data) => {
    try {

        return { success: true, message: 'Member updated successfully' };
    } catch (err) {
        console.error('Error:', err);
        return { error: 'Internal Server Error' };
    }
};


  exports.deleteMember = async (memberID) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`DELETE FROM Member WHERE memberID = ${memberID};`);
        connection.release();
        return {"Success": "Member deleted sucessfully."};
    } catch (err) {
        return{'Error:': err};
    }
  };