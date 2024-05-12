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


exports.registerMember = async (data) => {
    // add member to all relevant tables: member, membergoals, memberpreference, memberdetail, tutorslot, studentslot, 
    const { user } = data;

    console.log(data.schedule);

    // const connection = await pool.getConnection();
  
    // const [memberPersonalityTypeID] = await connection.query(`select personalitytypeid from personalitytype where personalitytypename = "${user.mbti}";`);
    // const memberInfo = {...data.user, mbti: memberPersonalityTypeID[0].personalitytypeid}
    // const {email, phone, password, firstName, lastName, mbti, role} = memberInfo;
    // const goals = {
    //   1: 'Improving Grades',
    //   2: 'Increasing Subject Expertise',
    //   3: 'Passing An Exam'
    // };
    // const memberGoals = data.goal.map(goalName => {
    //   for (const [goalID, name] of Object.entries(goals)) {
    //       if (name === goalName) {
    //           return parseInt(goalID);
    //       }
    //   }
    // });

    // await connection.query('INSERT INTO Member (email, phone, password, firstName, lastName, personalityTypeID, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [email, phone, password, firstName, lastName, mbti, role]);
    // let [memberID] = await this.getMemberID(email);
    // memberID = memberID[0].memberID;
    // for (let memberGoal of memberGoals) {
    //   await connection.query('INSERT INTO MemberGoal (memberID, goalID) VALUES (?, ?)', [memberID, memberGoal]);
    // }
    // connection.release();

    // let slotID = 1;
    // data.course.forEach(async (memberCourse) => {
    //   await connection.query('INSERT INTO StudentSlot (slotID, studentID, courseID) VALUES (?, ?, ?)', [slotID++, memberID, memberCourse]);
    // });
    // for (let [idx, preference] of data.preference.entries()) {
    //   await connection.query('INSERT INTO MemberPreference (memberID, preferenceID, preferenceImportance) VALUES (?, ?, ?)', [memberID, preference.preferenceID, preference.importance]);
    // }
      
    // return {member: `${memberInfo.role} added`};
    return {data}
}

exports.getMembers = async () => {
    const connection = await pool.getConnection();
  
    const [rows, fields] = await connection.query('SELECT * FROM Member');

    connection.release();

    return { members: rows }
}

exports.getMemberID = async (email) => {
    const connection = await pool.getConnection();
  
    const member = await connection.query(`SELECT memberID FROM Member WHERE email = "${email}";`);

    connection.release();

    return member;
}

exports.startSession = async (session, credentials) => {
  const connection = await pool.getConnection();

  const { email, password } = credentials;
  if (email && password) {
    try {
      const [result] = await connection.query('SELECT memberID, password FROM Member WHERE email = ?', [email]);
      connection.release();

      if (result.length) {
        const res = result[0]
        const passwordMatch = res.password;

        // Compare the provided password with the hashed password
        // const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordMatch === password) {
          const id = res.memberID;
          session.user = { email, id };
          return { status: 200, data: { user : session.user } }; // Successful login
        } else {
          return { status: 401, data: { error: "Invalid email or password."} }; // Unauthorized
        }
      } else {
        return { status: 404, data: {error: "User not found."} }; // User not found
      }
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, data: {error: "Internal Server Error"} }; // Internal server error
    }
  } else {
    return { status: 400, data: {error: "Missing email or password."} }; // Bad request
  }
};




exports.endSession = async (session) => {
    session.destroy();
    return {"Success": "Logged out"};
}
