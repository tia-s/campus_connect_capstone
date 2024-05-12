const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const mysql = require('mysql2/promise'); 


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});




exports.buildPreferenceMatrix = async () => {
    try {
        const connection = await pool.getConnection();

        const [preferences] = await connection.query("SELECT preferenceID, preferenceName FROM preference;");
        const [preferenceDetails] = await connection.query("SELECT preferenceID, preferenceDetailID, preferenceDetailName FROM PreferenceDetail;");
        const [memberPreferences] = await connection.query("SELECT memberID, preferenceID, preferenceImportance FROM MemberPreference;");
        const [memberPreferenceDetails] = await connection.query("SELECT memberID, preferenceDetailID, preferenceLevel FROM MemberPreferenceDetail;");

        // Create a matrix to store preference details for each user
        const userPreferenceMatrix = [];

        // Loop through each member
        memberPreferences.forEach(({ memberID }) => {
            // Initialize an array for each user
            const userRow = [];

            // Loop through preferences to populate the user's preference details
            preferences.forEach(({ preferenceID }) => {
                // Find the preference detail for the current user and preference
                const detail = memberPreferenceDetails.find(detail => detail.memberID === memberID && detail.preferenceID === preferenceID);
                if (detail) {
                    // Find the preference detail name
                    const preferenceDetailName = preferenceDetails.find(p => p.preferenceDetailID === detail.preferenceDetailID)?.preferenceDetailName || null;
                    userRow.push(preferenceDetailName);
                } else {
                    userRow.push(null);
                }
            });

            // Push the user's row to the matrix
            userPreferenceMatrix.push(userRow);
        });

        connection.release();

        return userPreferenceMatrix;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}





exports.validateMember = async (memberID) => {
    try {
        const result = await filterTutors(memberID);

        if (result && result.validTutors) {
            const { validTutors } = result;

            const isValid = validTutors.length > 0;
            const tutorIDs = validTutors.map(tutor => tutor.tutorID);

            return { "tutors": tutorIDs };
        } else {
            console.error("Error: validTutors is undefined or null");
            return { isValid: false };
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

exports.getSchedule = async (memberID) => {
    const connection = await pool.getConnection();
    const q = `
    SELECT * FROM schedule where memberID = ${memberID}
    `;

    try {
        const [scheduleData] = await connection.query(q);
        const scheduleObject = {};

        scheduleData.forEach(slot => {
            const { dayOfWeek, startTime, endTime } = slot;
            scheduleObject[dayOfWeek] = [startTime, endTime];
        });

        connection.release();
        return { scheduleObject };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

exports.scoreMember = async (memberID) => {
    const connection = await pool.getConnection();
    const q = `
    SELECT * FROM memberpreference where memberID = ${memberID}
    `;

    try {
        const [scores] = await connection.query(q);

        const weights = scores.map(score => parseFloat(score.preferenceImportance));

        connection.release();
        return { weights };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

exports.matchMember = async () => {
    const connection = await pool.getConnection();
    const q = `
    SELECT s.studentSlotID, s.tutorID, s.score
    FROM score s
    JOIN (
        SELECT studentSlotID, MAX(score) AS maxScore
        FROM score
        GROUP BY studentSlotID
    ) m ON s.studentSlotID = m.studentSlotID AND s.score = m.maxScore
    `;

    try {
        const [scores] = await connection.query(q);

        for (const score of scores) {
            await connection.query(`
                INSERT INTO Matches (studentSlotID, tutorID) VALUES (?, ?)
            `, [score.studentSlotID, score.tutorID]);
        }

        connection.release();
        return { success: true };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
