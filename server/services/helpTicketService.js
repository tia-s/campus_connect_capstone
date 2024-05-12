const jwt = require('jsonwebtoken');
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


//   gets all open tickets
  exports.getTickets = async () => {
    try {
        const connection = await pool.getConnection();

        const events = await connection.query('SELECT * FROM HelpTicket WHERE status = "open";');
        connection.release();
        return events;
    } catch (err) {
        return{'Error:': err};
    }
  };

  exports.getTicket = async (ticketID) => {
    try {
        const connection = await pool.getConnection();
        
        const member = await connection.query(`SELECT * FROM HelpTicket WHERE ticketID = ${ticketID};`);

        connection.release();
        return member;
    } catch (err) {
        return{'Error:': err};
    }
  };

  exports.createTicket = async (data) => {
    try {
        const { memberID, adminID, description } = data;
        
        const connection = await pool.getConnection();
        await connection.query(`INSERT INTO HelpTicket (memberID, adminID, description) VALUES (?, ?, ?)`, [memberID, adminID, description]);
        connection.release();
        return {"Success": "Help Ticket added."};
    } catch (err) {
        return {'Error:': err};
    }
  };


