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


  exports.getEvents = async (memberID) => {
    try {
        const connection = await pool.getConnection();
        const q_tutor = `SELECT e.eventID, e.eventName, e.eventDate, e.startTime, e.endTime
        FROM Event e
        WHERE e.tutorID = ${memberID};`

        const q_student = `SELECT e.eventID, e.eventName, e.eventDate, e.startTime, e.endTime
        FROM Event e
        WHERE e.studentID = ${memberID};`

        const [events] = await connection.query(q_student);
        connection.release();
        return events;
    } catch (err) {
        return{'Error:': err};
    }
  };

  exports.getEvent = async (eventID) => {
    try {
        const connection = await pool.getConnection();
        
        const member = await connection.query(`SELECT * FROM Event WHERE eventID = ${eventID};`);

        connection.release();
        return member;
    } catch (err) {
        return{'Error:': err};
    }
  };

  exports.createEvent = async (data) => {
    try {
        const { eventName, eventDate, startTime, endTime, tutorID, studentID } = data;
        
        const connection = await pool.getConnection();
        await connection.query(`INSERT INTO Event (eventName, eventDate, startTime, endTime, tutorID, studentID) VALUES (?, ?, ?, ?, ?, ?)`, [eventName, eventDate, startTime, endTime, tutorID, studentID]);
        connection.release();
        return {"Success": "Event added."};
    } catch (err) {
        return {'Error:': err};
    }
  };

    // create session
  exports.startEvent = async (data) => {
    try {
        const { eventID } = data;
        
        const connection = await pool.getConnection();
        await connection.query(`INSERT INTO Session (eventID) VALUES (?)`, [eventID]);
        connection.release();
        return {"Success": "Session started."};
    } catch (err) {
        return {'Error:': err};
    }
  };

//   exports.updateMember = async (memberID, data) => {
//     try {

//         return { success: true, message: 'Member updated successfully' };
//     } catch (err) {
//         console.error('Error:', err);
//         return { error: 'Internal Server Error' };
//     }
// };