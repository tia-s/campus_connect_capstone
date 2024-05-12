const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise'); 
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


//   get all member lesson plans
  exports.getLessonPlans = async (memberID) => {
    try {
        const connection = await pool.getConnection();
        const q_tutor = `SELECT lp.lessonPlanID, lp.tutorID, lp.studentSlotID, c.courseName, c.courseUniversity, m.firstName, m.lastName
        FROM LessonPlan lp
        JOIN StudentSlot ss ON lp.studentSlotID = ss.slotID
        JOIN Course c ON ss.courseID = c.courseID
        JOIN Member m ON m.memberID = ss.studentID
        WHERE lp.tutorID = ${memberID};`

        const q_student = `SELECT lp.lessonPlanID, lp.tutorID, lp.studentSlotID, c.courseName, c.courseUniversity, m.firstName, m.lastName
        FROM LessonPlan lp
        JOIN StudentSlot ss ON lp.studentSlotID = ss.slotID
        JOIN Course c ON ss.courseID = c.courseID
        JOIN Member m ON m.memberID = lp.tutorID
        WHERE ss.studentID = ${memberID};`

        const lessonPlans = await connection.query(q_student);
        connection.release();
        return lessonPlans[0];
    } catch (err) {
        return{'error:': err};
    }
  };

// get lessons in lesson plan
  exports.getLessonPlan = async (lessonPlanID) => {
    try {
        const connection = await pool.getConnection();
        const q = `SELECT l.lessonID, l.sessionNumber, l.lessonName, l.description
        FROM Lesson l
        JOIN LessonPlan lp ON l.lessonPlanID = lp.lessonPlanID
        WHERE lp.lessonPlanID = ${lessonPlanID};`

        const member = await connection.query(q);
        connection.release();
        return member;
    } catch (err) {
        return{'error:': err};
    }
  };

  exports.createLessonPlan = async (data) => {
    try {
        const { tutorID, studentSlotID } = data;
        
        const connection = await pool.getConnection();
        await connection.query(`INSERT INTO LessonPlan (tutorID, studentSlotID) VALUES (?, ?)`, [tutorID, studentSlotID]);
        connection.release();
        return {"success": "Member added."};
    } catch (err) {
        return {'error:': err};
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