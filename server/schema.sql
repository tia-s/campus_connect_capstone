DROP DATABASE IF EXISTS campus_connect;
CREATE DATABASE IF NOT EXISTS campus_connect;

USE campus_connect; 


CREATE TABLE PersonalityType(
    personalityTypeID INT AUTO_INCREMENT,
    personalityTypeName VARCHAR(50) NOT NULL,
    PRIMARY KEY(personalityTypeID),
    CONSTRAINT UNIQUE(personalityTypeName),
    CONSTRAINT CHECK(personalityTypeName IN ('ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'))
);

INSERT INTO PersonalityType (personalityTypeName) VALUES
('ISTJ'),
('ISFJ'),
('INFJ'),
('INTJ'),
('ISTP'),
('ISFP'),
('INFP'),
('INTP'),
('ESTP'),
('ESFP'),
('ENFP'),
('ENTP'),
('ESTJ'),
('ESFJ'),
('ENFJ'),
('ENTJ');

CREATE TABLE IF NOT EXISTS PersonalityTypeMatch (
    personalityTypeID1 INT NOT NULL,
    personalityTypeID2 INT NOT NULL,
    matchScore INT CHECK (matchScore BETWEEN 1 AND 10),
    PRIMARY KEY (personalityTypeID1, personalityTypeID2),
    FOREIGN KEY (personalityTypeID1) REFERENCES PersonalityType(personalityTypeID),
    FOREIGN KEY (personalityTypeID2) REFERENCES PersonalityType(personalityTypeID)
);

INSERT INTO PersonalityTypeMatch (personalityTypeID1, personalityTypeID2, matchScore)
SELECT pt1.personalityTypeID, pt2.personalityTypeID, FLOOR(RAND() * 10) + 1
FROM PersonalityType pt1
CROSS JOIN PersonalityType pt2
WHERE pt1.personalityTypeID != pt2.personalityTypeID;

CREATE TABLE IF NOT EXISTS Member (
    memberID INT AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL CHECK(LENGTH(password) >= 8),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    role ENUM('student', 'tutor') NOT NULL,
    personalityTypeID INT NOT NULL,
    PRIMARY KEY(memberID),
    FOREIGN KEY (personalityTypeID) REFERENCES PersonalityType(personalityTypeID),
    CONSTRAINT CHECK(REGEXP_LIKE(email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'))
);

INSERT INTO Member (email, phone, password, firstName, lastName, role, personalityTypeID) VALUES
('member1@example.com', '1234567890', 'password1', 'John', 'Doe', 'student', 1),
('member2@example.com', '1234567891', 'password2', 'Jane', 'Smith', 'tutor', 2),
('member3@example.com', '1234567892', 'password3', 'Alice', 'Johnson', 'student', 3),
('member4@example.com', '1234567893', 'password4', 'Bob', 'Brown', 'student', 4),
('member5@example.com', '1234567894', 'password5', 'Emily', 'Davis', 'student', 5),
('member6@example.com', '1234567895', 'password6', 'Michael', 'Wilson', 'tutor', 6),
('member7@example.com', '1234567896', 'password7', 'Sarah', 'Martinez', 'student', 7),
('member8@example.com', '1234567897', 'password8', 'David', 'Anderson', 'student', 8),
('member9@example.com', '1234567898', 'password9', 'Jennifer', 'Taylor', 'student', 9),
('member10@example.com', '1234567899', 'password10', 'Christopher', 'Thomas', 'student', 10),
('member11@example.com', '1234567800', 'password11', 'Mary', 'Jackson', 'student', 11),
('member12@example.com', '1234567801', 'password12', 'Matthew', 'White', 'student', 12),
('member13@example.com', '1234567802', 'password13', 'Laura', 'Harris', 'student', 13),
('member14@example.com', '1234567803', 'password14', 'Daniel', 'Martin', 'student', 14),
('member15@example.com', '1234567804', 'password15', 'Jessica', 'Thompson', 'student', 15),
('member16@example.com', '1234567805', 'password16', 'Andrew', 'Garcia', 'student', 16),
('member17@example.com', '1234567806', 'password17', 'Elizabeth', 'Lee', 'student', 1),
('member18@example.com', '1234567807', 'password18', 'Ryan', 'Walker', 'student', 2),
('member19@example.com', '1234567808', 'password19', 'Lauren', 'Perez', 'student', 3),
('member20@example.com', '1234567809', 'password20', 'Adam', 'Hall', 'tutor', 4),
('member21@example.com', '1234567809', 'password20', 'Sammy', 'Hall', 'tutor', 4),
('member22@example.com', '1234567809', 'password20', 'James', 'Hall', 'tutor', 4),
('member23@example.com', '1234567809', 'password20', 'Perry', 'Hall', 'tutor', 4),
('member24@example.com', '1234567809', 'password20', 'Agatha', 'Hall', 'tutor', 4),
('member25@example.com', '1234567809', 'password20', 'Smarty', 'Hall', 'tutor', 4),
('member26@example.com', '1234567809', 'password20', 'Smithy', 'Hall', 'tutor', 4);

CREATE TABLE IF NOT EXISTS Admin (
    adminID INT AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(100) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    PRIMARY KEY(adminID),
    CONSTRAINT CHECK(REGEXP_LIKE(email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'))
);

INSERT INTO Admin (email, phone, firstName, lastName) VALUES ("admin@example.com", "13091289823", "Admin", "Doe");

CREATE TABLE IF NOT EXISTS Day (
    ID INT CHECK (ID BETWEEN 0 AND 6),
    dayName VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO Day (ID, dayName) VALUES
(0, 'Sunday'),
(1, 'Monday'),
(2, 'Tuesday'),
(3, 'Wednesday'),
(4, 'Thursday'),
(5, 'Friday'),
(6, 'Saturday');

CREATE TABLE IF NOT EXISTS Schedule (
    memberID INT,
    dayOfWeek INT,
    timeSlotID INT,
    startTime TIME,
    endTime TIME,
    PRIMARY KEY (memberID, dayOfWeek, timeSlotID),
    FOREIGN KEY (dayOfWeek) REFERENCES Day(ID)
);

-- Schedule for all 20 members for all days of the week
INSERT INTO Schedule (memberID, dayOfWeek, timeSlotID, startTime, endTime) VALUES
(1, 0, 1, '08:00:00', '10:00:00'), (1, 1, 2, '09:00:00', '11:00:00'), (1, 2, 3, '10:00:00', '12:00:00'), (1, 3, 4, '11:00:00', '13:00:00'), (1, 4, 5, '12:00:00', '14:00:00'), (1, 5, 6, '13:00:00', '15:00:00'), (1, 6, 7, '14:00:00', '16:00:00'),
(2, 0, 1, '08:30:00', '10:30:00'), (2, 1, 2, '09:30:00', '11:30:00'), (2, 2, 3, '10:30:00', '12:30:00'), (2, 3, 4, '11:30:00', '13:30:00'), (2, 4, 5, '12:30:00', '14:30:00'), (2, 5, 6, '13:30:00', '15:30:00'), (2, 6, 7, '14:30:00', '16:30:00'),
(3, 0, 1, '08:00:00', '10:00:00'), (3, 1, 2, '09:00:00', '11:00:00'), (3, 2, 3, '10:00:00', '12:00:00'), (3, 3, 4, '11:00:00', '13:00:00'), (3, 4, 5, '12:00:00', '14:00:00'), (3, 5, 6, '13:00:00', '15:00:00'), (3, 6, 7, '14:00:00', '16:00:00'),
(4, 0, 1, '08:30:00', '10:30:00'), (4, 1, 2, '09:30:00', '11:30:00'), (4, 2, 3, '10:30:00', '12:30:00'), (4, 3, 4, '11:30:00', '13:30:00'), (4, 4, 5, '12:30:00', '14:30:00'), (4, 5, 6, '13:30:00', '15:30:00'), (4, 6, 7, '14:30:00', '16:30:00'),
(5, 0, 1, '08:00:00', '10:00:00'), (5, 1, 2, '09:00:00', '11:00:00'), (5, 2, 3, '10:00:00', '12:00:00'), (5, 3, 4, '11:00:00', '13:00:00'), (5, 4, 5, '12:00:00', '14:00:00'), (5, 5, 6, '13:00:00', '15:00:00'), (5, 6, 7, '14:00:00', '16:00:00'),
(6, 0, 1, '08:30:00', '10:30:00'), (6, 1, 2, '09:30:00', '11:30:00'), (6, 2, 3, '10:30:00', '12:30:00'), (6, 3, 4, '11:30:00', '13:30:00'), (6, 4, 5, '12:30:00', '14:30:00'), (6, 5, 6, '13:30:00', '15:30:00'), (6, 6, 7, '14:30:00', '16:30:00'),
(7, 0, 1, '08:00:00', '10:00:00'), (7, 1, 2, '09:00:00', '11:00:00'), (7, 2, 3, '10:00:00', '12:00:00'), (7, 3, 4, '11:00:00', '13:00:00'), (7, 4, 5, '12:00:00', '14:00:00'), (7, 5, 6, '13:00:00', '15:00:00'), (7, 6, 7, '14:00:00', '16:00:00'),
(8, 0, 1, '08:30:00', '10:30:00'), (8, 1, 2, '09:30:00', '11:30:00'), (8, 2, 3, '10:30:00', '12:30:00'), (8, 3, 4, '11:30:00', '13:30:00'), (8, 4, 5, '12:30:00', '14:30:00'), (8, 5, 6, '13:30:00', '15:30:00'), (8, 6, 7, '14:30:00', '16:30:00'),
(9, 0, 1, '08:00:00', '10:00:00'), (9, 1, 2, '09:00:00', '11:00:00'), (9, 2, 3, '10:00:00', '12:00:00'), (9, 3, 4, '11:00:00', '13:00:00'), (9, 4, 5, '12:00:00', '14:00:00'), (9, 5, 6, '13:00:00', '15:00:00'), (9, 6, 7, '14:00:00', '16:00:00'),
(10, 0, 1, '08:30:00', '10:30:00'), (10, 1, 2, '09:30:00', '11:30:00'), (10, 2, 3, '10:30:00', '12:30:00'), (10, 3, 4, '11:30:00', '13:30:00'), (10, 4, 5, '12:30:00', '14:30:00'), (10, 5, 6, '13:30:00', '15:30:00'), (10, 6, 7, '14:30:00', '16:30:00'),
(11, 0, 1, '08:00:00', '10:00:00'), (11, 1, 2, '09:00:00', '11:00:00'), (11, 2, 3, '10:00:00', '12:00:00'), (11, 3, 4, '11:00:00', '13:00:00'), (11, 4, 5, '12:00:00', '14:00:00'), (11, 5, 6, '13:00:00', '15:00:00'), (11, 6, 7, '14:00:00', '16:00:00'),
(12, 0, 1, '08:30:00', '10:30:00'), (12, 1, 2, '09:30:00', '11:30:00'), (12, 2, 3, '10:30:00', '12:30:00'), (12, 3, 4, '11:30:00', '13:30:00'), (12, 4, 5, '12:30:00', '14:30:00'), (12, 5, 6, '13:30:00', '15:30:00'), (12, 6, 7, '14:30:00', '16:30:00'),
(13, 0, 1, '08:00:00', '10:00:00'), (13, 1, 2, '09:00:00', '11:00:00'), (13, 2, 3, '10:00:00', '12:00:00'), (13, 3, 4, '11:00:00', '13:00:00'), (13, 4, 5, '12:00:00', '14:00:00'), (13, 5, 6, '13:00:00', '15:00:00'), (13, 6, 7, '14:00:00', '16:00:00'),
(14, 0, 1, '08:30:00', '10:30:00'), (14, 1, 2, '09:30:00', '11:30:00'), (14, 2, 3, '10:30:00', '12:30:00'), (14, 3, 4, '11:30:00', '13:30:00'), (14, 4, 5, '12:30:00', '14:30:00'), (14, 5, 6, '13:30:00', '15:30:00'), (14, 6, 7, '14:30:00', '16:30:00'),
(15, 0, 1, '08:00:00', '10:00:00'), (15, 1, 2, '09:00:00', '11:00:00'), (15, 2, 3, '10:00:00', '12:00:00'), (15, 3, 4, '11:00:00', '13:00:00'), (15, 4, 5, '12:00:00', '14:00:00'), (15, 5, 6, '13:00:00', '15:00:00'), (15, 6, 7, '14:00:00', '16:00:00'),
(16, 0, 1, '08:30:00', '10:30:00'), (16, 1, 2, '09:30:00', '11:30:00'), (16, 2, 3, '10:30:00', '12:30:00'), (16, 3, 4, '11:30:00', '13:30:00'), (16, 4, 5, '12:30:00', '14:30:00'), (16, 5, 6, '13:30:00', '15:30:00'), (16, 6, 7, '14:30:00', '16:30:00'),
(17, 0, 1, '08:00:00', '10:00:00'), (17, 1, 2, '09:00:00', '11:00:00'), (17, 2, 3, '10:00:00', '12:00:00'), (17, 3, 4, '11:00:00', '13:00:00'), (17, 4, 5, '12:00:00', '14:00:00'), (17, 5, 6, '13:00:00', '15:00:00'), (17, 6, 7, '14:00:00', '16:00:00'),
(18, 0, 1, '08:30:00', '10:30:00'), (18, 1, 2, '09:30:00', '11:30:00'), (18, 2, 3, '10:30:00', '12:30:00'), (18, 3, 4, '11:30:00', '13:30:00'), (18, 4, 5, '12:30:00', '14:30:00'), (18, 5, 6, '13:30:00', '15:30:00'), (18, 6, 7, '14:30:00', '16:30:00'),
(19, 0, 1, '08:00:00', '10:00:00'), (19, 1, 2, '09:00:00', '11:00:00'), (19, 2, 3, '10:00:00', '12:00:00'), (19, 3, 4, '11:00:00', '13:00:00'), (19, 4, 5, '12:00:00', '14:00:00'), (19, 5, 6, '13:00:00', '15:00:00'), (19, 6, 7, '14:00:00', '16:00:00'),
(20, 0, 1, '08:30:00', '10:30:00'), (20, 1, 2, '09:30:00', '11:30:00'), (20, 2, 3, '10:30:00', '12:30:00'), (20, 3, 4, '11:30:00', '13:30:00'), (20, 4, 5, '12:30:00', '14:30:00'), (20, 5, 6, '13:30:00', '15:30:00'), (20, 6, 7, '14:30:00', '16:30:00');


CREATE TABLE IF NOT EXISTS Preference (
    preferenceID INT AUTO_INCREMENT,
    preferenceName VARCHAR(50) NOT NULL,
    PRIMARY KEY (preferenceID)
);

CREATE TABLE IF NOT EXISTS PreferenceDetail (
    preferenceDetailID INT AUTO_INCREMENT,
    preferenceID INT,
    preferenceDetailName VARCHAR(255) NOT NULL,
    CONSTRAINT unique_preference_detail_name UNIQUE (preferenceID, preferenceDetailName),
    PRIMARY KEY(preferenceDetailID),
    FOREIGN KEY (preferenceID) REFERENCES Preference(preferenceID) 
);

INSERT INTO Preference (preferenceName) VALUES 
('primaryLearningStyle'),
('secondaryLearningStyle'),
('communicationMethod'),
('communicationStyle');

INSERT INTO PreferenceDetail (preferenceID, preferenceDetailName) VALUES
-- For primaryLearningStyle
(1, 'auditory'),
(1, 'visual'),
(1, 'kinesthetic'),
-- For secondaryLearningStyle
(2, 'social'),
(2, 'solitary'),
-- For communicationMethod
(3, 'video'),
(3, 'audio'),
(3, 'chat'),
-- For communicationStyle
(4, 'direct'),
(4, 'conversational');

CREATE TABLE IF NOT EXISTS MemberPreference (
    memberID INT NOT NULL,
    preferenceID INT NOT NULL,
    preferenceImportance DECIMAL(3,1) CHECK (preferenceImportance IN (0, 0.5, 1)),
    PRIMARY KEY (memberID, preferenceID),
    FOREIGN KEY (memberID) REFERENCES Member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (preferenceID) REFERENCES Preference(preferenceID)
);

INSERT INTO MemberPreference (memberID, preferenceID, preferenceImportance) VALUES
(1, 1, 1), (1, 2, 0.5), (1, 3, 1), (1, 4, 0),
(2, 1, 0.5), (2, 2, 1), (2, 3, 0.5), (2, 4, 1),
(3, 1, 1), (3, 2, 0), (3, 3, 1), (3, 4, 0.5),
(4, 1, 0), (4, 2, 1), (4, 3, 1), (4, 4, 1),
(5, 1, 0), (5, 2, 0.5), (5, 3, 1), (5, 4, 0),
(6, 1, 1), (6, 2, 1), (6, 3, 0.5), (6, 4, 1),
(7, 1, 1), (7, 2, 0.5), (7, 3, 0), (7, 4, 0.5),
(8, 1, 0.5), (8, 2, 1), (8, 3, 1), (8, 4, 1),
(9, 1, 0), (9, 2, 0), (9, 3, 1), (9, 4, 0),
(10, 1, 1), (10, 2, 1), (10, 3, 1), (10, 4, 1),
(11, 1, 0), (11, 2, 0.5), (11, 3, 1), (11, 4, 0),
(12, 1, 1), (12, 2, 0.5), (12, 3, 1), (12, 4, 1),
(13, 1, 0), (13, 2, 1), (13, 3, 0.5), (13, 4, 1),
(14, 1, 1), (14, 2, 0), (14, 3, 0.5), (14, 4, 0.5),
(15, 1, 1), (15, 2, 1), (15, 3, 0.5), (15, 4, 1),
(16, 1, 0.5), (16, 2, 0), (16, 3, 1), (16, 4, 0),
(17, 1, 1), (17, 2, 0), (17, 3, 1), (17, 4, 1),
(18, 1, 0), (18, 2, 1), (18, 3, 0.5), (18, 4, 0),
(19, 1, 1), (19, 2, 1), (19, 3, 1), (19, 4, 1),
(20, 1, 0), (20, 2, 0.5), (20, 3, 1), (20, 4, 1);


CREATE TABLE IF NOT EXISTS MemberPreferenceDetail (
    memberID INT,
    preferenceDetailID INT,
    preferenceLevel INT CHECK (preferenceLevel BETWEEN 0 AND 100),
    PRIMARY KEY (memberID, preferenceDetailID),
    FOREIGN KEY (memberID) REFERENCES Member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (preferenceDetailID) REFERENCES PreferenceDetail(preferenceDetailID)
);

INSERT INTO MemberPreferenceDetail (memberID, preferenceDetailID, preferenceLevel) VALUES
(1, 1, 80), (1, 2, 20), (1, 3, 90), (1, 4, 70),
(2, 1, 50), (2, 2, 80), (2, 3, 60), (2, 4, 90),
(3, 1, 90), (3, 2, 10), (3, 3, 70), (3, 4, 50),
(4, 1, 20), (4, 2, 90), (4, 3, 80), (4, 4, 100),
(5, 1, 10), (5, 2, 60), (5, 3, 40), (5, 4, 30),
(6, 1, 80), (6, 2, 70), (6, 3, 50), (6, 4, 80),
(7, 1, 60), (7, 2, 30), (7, 3, 10), (7, 4, 40),
(8, 1, 40), (8, 2, 80), (8, 3, 90), (8, 4, 90),
(9, 1, 30), (9, 2, 20), (9, 3, 70), (9, 4, 20),
(10, 1, 90), (10, 2, 100), (10, 3, 80), (10, 4, 90),
(11, 1, 20), (11, 2, 50), (11, 3, 90), (11, 4, 40),
(12, 1, 80), (12, 2, 30), (12, 3, 80), (12, 4, 70),
(13, 1, 10), (13, 2, 90), (13, 3, 70), (13, 4, 90),
(14, 1, 70), (14, 2, 40), (14, 3, 60), (14, 4, 60),
(15, 1, 90), (15, 2, 80), (15, 3, 50), (15, 4, 90),
(16, 1, 50), (16, 2, 40), (16, 3, 90), (16, 4, 30),
(17, 1, 80), (17, 2, 30), (17, 3, 90), (17, 4, 80),
(18, 1, 20), (18, 2, 80), (18, 3, 60), (18, 4, 20),
(19, 1, 90), (19, 2, 90), (19, 3, 90), (19, 4, 90),
(20, 1, 10), (20, 2, 60), (20, 3, 90), (20, 4, 90);

CREATE TABLE IF NOT EXISTS Course (
    courseID VARCHAR(255),
    courseName VARCHAR(255) NOT NULL, 
    courseUniversity ENUM('UWI', 'UTECH') NOT NULL,
    PRIMARY KEY(courseID)
);

INSERT INTO Course (courseID, courseName, courseUniversity) VALUES
('COMP1126', 'Introduction to Computing I', 'UWI'),
('COMP1127', 'Introduction to Computing II', 'UWI'),
('COMP1161', 'Object-Oriented Programming', 'UWI'),
('COMP1210', 'Mathematics for Computing', 'UWI'),
('COMP1220', 'Computing and Society', 'UWI'),
('SWEN1007', 'Software Engineering Essentials', 'UWI'),
('COMP2130', 'Systems Programming', 'UWI'),
('COMP2140', 'Software Engineering', 'UWI'),
('COMP2171', 'Object Oriented Design and Implementation', 'UWI'),
('COMP2190', 'Net-Centric Computing', 'UWI'),
('COMP2201', 'Discrete Mathematics for Computer Science', 'UWI'),
('COMP2211', 'Analysis of Algorithms', 'UWI'),
('COMP2340', 'Computer Systems Organization', 'UWI'),
('INFO2101', 'Probability and Statistics for Computing', 'UWI'),
('INFO2111', 'Data Structures', 'UWI'),
('INFO2180', 'Dynamic Web Development 1', 'UWI'),
('SWEN2165', 'Requirements Engineering', 'UWI'),
('COMP3092', 'An Introduction to Quantum Computing', 'UWI'),
('COMP3101', 'Operating Systems', 'UWI'),
('COMP3161', 'Database Management Systems', 'UWI'),
('COMP3162', 'Data Science Principles', 'UWI'),
('COMP3191', 'Principles of Computer Networking', 'UWI'),
('COMP3192', 'Implementation of Computer Networks', 'UWI'),
('COMP3220', 'Principles of Artificial Intelligence', 'UWI'),
('COMP3410', 'Introduction to Parallel Computing', 'UWI'),
('COMP3652', 'Language Processors', 'UWI'),
('COMP3702', 'Theory of Computation', 'UWI'),
('COMP3801', 'Real-Time Embedded Systems', 'UWI'),
('COMP3802', 'Speech and Language Technology', 'UWI'),
('COMP3901', 'Capstone Project', 'UWI'),
('COMP3911', 'Internship in Computing I', 'UWI'),
('COMP3912', 'Internship in Computing II', 'UWI'),
('INFO3106', 'Computer Systems Administration', 'UWI'),
('INFO3110', 'Information Systems', 'UWI'),
('INFO3155', 'Information Assurance and Security', 'UWI'),
('INFO3165', 'Security Analysis and Digital Forensics', 'UWI'),
('INFO3171', 'User Interface Design', 'UWI'),
('INFO3180', 'Dynamic Web Development II', 'UWI'),
('INFO3435', 'Ecommerce', 'UWI'),
('SWEN3000', 'Application Development for iOS Devices', 'UWI'),
('SWEN3001', 'Android Application Development I', 'UWI'),
('SWEN3002', 'Android Application Development II', 'UWI'),
('SWEN3003', 'Web & Mobile Application Development I', 'UWI'),
('SWEN3004', 'Web & Mobile Application Development II', 'UWI'),
('SWEN3120', 'Software Architecture', 'UWI'),
('SWEN3130', 'Software Project Management', 'UWI'),
('SWEN3145', 'Software Modelling', 'UWI'),
('SWEN3165', 'Software Testing', 'UWI'),
('SWEN3185', 'Formal Methods and Software Reliability', 'UWI'),
('SWEN3920', 'Capstone Project (Software Engineering)', 'UWI'),
('SWEN4001', 'Advanced Database Systems', 'UWI'),
('SWEN4002', 'IT Certification I (Course Shell)', 'UWI'),
('CMP1024', 'Programming 1', 'UTECH'),
('INT1001', 'Information Technology', 'UTECH'),
('COM1020', 'Academic Writing I', 'UTECH'),
('MAT1047', 'College Mathematics 1B', 'UTECH'),
('CMP1026', 'Computer Networks 1', 'UTECH'),
('CSP1001', 'Community Service Project', 'UTECH'),
('CMP1025', 'Programming 2', 'UTECH'),
('MAT1008', 'Discrete Mathematics', 'UTECH'),
('ENS3001', 'Environmental Studies or Fitness & Wellness or Material Science', 'UTECH'),
('COM2014', 'Academic Writing II', 'UTECH'),
('PSY1002', 'Introduction to Psychology', 'UTECH'),
('CIT2004', 'Object-Oriented Programming Using C++', 'UTECH'),
('STA2020', 'Introductory Statistics', 'UTECH'),
('CMP2018', 'Database Design', 'UTECH'),
('CIT2011', 'Web Programming', 'UTECH'),
('CMP1005', 'Computer Logic & Digital Design', 'UTECH'),
('CMP2006', 'Data Structures', 'UTECH'),
('CMP2019', 'Software Engineering: Analysis & Design', 'UTECH'),
('PHS1019', 'Physics for Computer Science', 'UTECH'),
('HUM3010', 'Professional, Ethical & Legal Implications of Computer Systems', 'UTECH'),
('CIT3002', 'Operating Systems', 'UTECH'),
('CIT4024', 'IT Project Management', 'UTECH'),
('CIT3003', 'Analysis of Algorithms', 'UTECH'),
('CIT3009', 'Advanced Programming', 'UTECH'),
('BIO3004', 'Introduction to Bio-Informatics', 'UTECH'),
('RES3024', 'Computing Research Methods', 'UTECH'),
('STA2016', 'Design of Experiments', 'UTECH'),
('MAT2003', 'Calculus I', 'UTECH'),
('CIT3006', 'Theory of Computation', 'UTECH'),
('CIT4020', 'Computer Security', 'UTECH'),
('CIT3029', 'Internship (Optional)', 'UTECH'),
('MAT1043', 'Linear Algebra', 'UTECH'),
('CMP3011', 'Computer Organization & Assembly', 'UTECH'),
('CMP4011', 'Artificial Intelligence', 'UTECH'),
('CIT4004', 'Analysis of Programming Languages', 'UTECH'),
('CIT4036', 'Professional Development Seminar Level 4', 'UTECH'),
('PRJ4020', 'Major Project', 'UTECH');



CREATE TABLE IF NOT EXISTS Goal (
    goalID INT,
    goalName VARCHAR(255) NOT NULL,
    PRIMARY KEY(goalID)
);

INSERT INTO Goal (goalID, goalName) VALUES
(1, 'Improving Grades'),
(2, 'Increasing Subject Expertise'),
(3, 'Passing An Exam');

CREATE TABLE IF NOT EXISTS MemberGoal (
    memberID INT,
    goalID INT,
    PRIMARY KEY (memberID, goalID),
    FOREIGN KEY (memberID) REFERENCES Member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (goalID) REFERENCES Goal(goalID)
);

INSERT INTO MemberGoal (memberID, goalID) VALUES
-- Member 1
(1, 1), (1, 2), (1, 3),
-- Member 2
(2, 2), (2, 3),
-- Member 3
(3, 1), (3, 3),
-- Member 4
(4, 2), (4, 3),
-- Member 5
(5, 1), (5, 2), (5, 3),
-- Member 6
(6, 1), (6, 2), (6, 3),
-- Member 7
(7, 1), (7, 3),
-- Member 8
(8, 2), (8, 3),
-- Member 9
(9, 1), (9, 2), (9, 3),
-- Member 10
(10, 1), (10, 2), (10, 3),
-- Member 11
(11, 1), (11, 2), (11, 3),
-- Member 12
(12, 1), (12, 2), (12, 3),
-- Member 13
(13, 1), (13, 3),
-- Member 14
(14, 2), (14, 3),
-- Member 15
(15, 1), (15, 2), (15, 3),
-- Member 16
(16, 1), (16, 3),
-- Member 17
(17, 1), (17, 2), (17, 3),
-- Member 18
(18, 2), (18, 3),
-- Member 19
(19, 1), (19, 2), (19, 3),
-- Member 20
(20, 1), (20, 3);

CREATE TABLE IF NOT EXISTS StudentSlot (
    slotID INT AUTO_INCREMENT,
    studentID INT,
    courseID VARCHAR(255),
    numFailedMatchAttempt INT DEFAULT 0 CHECK (numFailedMatchAttempt >= 0),
    matched BOOLEAN DEFAULT 0,
    CONSTRAINT UNIQUE (studentID, courseID),
    PRIMARY KEY (slotID),
    FOREIGN KEY (studentID) REFERENCES Member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (courseID) REFERENCES Course(courseID)
);

INSERT INTO StudentSlot (studentID, courseID) VALUES (2, "COMP2340"), (4, "COMP3161"), (5, "INFO3165"), (5, "COMP1126");


CREATE TABLE IF NOT EXISTS TutorSlot (
    slotID INT,
    tutorID INT,
    numFailedMatchAttempt INT DEFAULT 0 CHECK (numFailedMatchAttempt >= 0),
    matched BOOLEAN DEFAULT 0,
    PRIMARY KEY (slotID, tutorID),
    FOREIGN KEY (tutorID) REFERENCES Member(memberID) ON DELETE CASCADE
);

INSERT INTO TutorSlot (slotID, tutorID) VALUES (1, 2), (2, 2), (3, 2), (1, 6), (2, 6), (3, 6);

CREATE TABLE IF NOT EXISTS Matches (
    matchID INT AUTO_INCREMENT,
    studentSlotID INT UNIQUE,
    tutorID INT,
    PRIMARY KEY (matchID),
    FOREIGN KEY (studentSlotID) REFERENCES StudentSlot(slotID),
    FOREIGN KEY (tutorID) REFERENCES Member(memberID) ON DELETE CASCADE
);
INSERT INTO Matches (studentSlotID, tutorID) VALUES (1, 2), (2, 6), (3, 2), (4, 6);


CREATE TABLE IF NOT EXISTS Score (
    studentSlotID INT,
    tutorID INT,
    score FLOAT,
    PRIMARY KEY (studentSlotID, tutorID),
    FOREIGN KEY (studentSlotID) REFERENCES StudentSlot(slotID),
    FOREIGN KEY (tutorID) REFERENCES Member(memberID) ON DELETE CASCADE
);

INSERT INTO Score (studentSlotID, tutorID, score) VALUES (1, 2, 50), (2, 6, 10), (3, 2, 19), (1, 6, 70), (3, 6, 25);

CREATE TABLE IF NOT EXISTS HelpTicket (
    ticketID INT AUTO_INCREMENT,
    memberID INT,
    adminID INT,
    description TEXT NOT NULL,
    status ENUM('open', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    PRIMARY KEY (ticketID),
    FOREIGN KEY (memberID) REFERENCES Member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (adminID) REFERENCES Admin(adminID) ON DELETE CASCADE
);

INSERT INTO HelpTicket (memberID, adminID, description) VALUES (3, 1, "I was not matched");

CREATE TABLE IF NOT EXISTS Setting (
    settingID INT AUTO_INCREMENT,
    settingName VARCHAR(255) NOT NULL,
    PRIMARY KEY (settingID)
);

CREATE TABLE IF NOT EXISTS Event (
    eventID INT AUTO_INCREMENT,
    eventName VARCHAR(255) NOT NULL,
    eventDate DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    tutorID INT,
    studentID INT,    
    PRIMARY KEY (eventID),
    FOREIGN KEY (tutorID) REFERENCES Member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (studentID) REFERENCES Member(memberID) ON DELETE CASCADE
);

INSERT INTO Event (eventName, eventDate, startTime, endTime, tutorID, studentID) VALUES ("event 1", "2023-04-05", "12:00", "17:00", 1, 2);

CREATE TABLE IF NOT EXISTS Session (
    sessionID INT AUTO_INCREMENT,
    eventID INT,
    PRIMARY KEY (sessionID),
    FOREIGN KEY (eventID) REFERENCES Event(eventID)
);
INSERT INTO Session (eventID) VALUES (1);


CREATE TABLE IF NOT EXISTS LessonPlan (
    lessonPlanID INT AUTO_INCREMENT,
    tutorID INT,
    studentSlotID INT UNIQUE,
    PRIMARY KEY (lessonPlanID),
    FOREIGN KEY (tutorID) REFERENCES Member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (studentSlotID) REFERENCES StudentSlot(slotID) ON DELETE CASCADE
);

INSERT INTO LessonPlan (tutorID, studentSlotID) VALUES (3, 3), (2, 4);

CREATE TABLE IF NOT EXISTS Lesson (
    lessonID INT AUTO_INCREMENT,
    lessonPlanID INT,
    lessonName VARCHAR(255) NOT NULL,
    sessionNumber INT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (lessonID),
    FOREIGN KEY (lessonPlanID) REFERENCES LessonPlan(lessonPlanID) ON DELETE CASCADE
);

INSERT INTO Lesson (lessonPlanID, sessionNumber, lessonName, description) VALUES (1, 3, "Lesson 3", "third session"), (1, 2, "Lesson 2", "second session"), (2, 2, "Lesson 2", "second session");

CREATE TABLE IF NOT EXISTS Review (
    reviewID INT AUTO_INCREMENT,
    tutorID INT,
    studentID INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (reviewID),
    CONSTRAINT UNIQUE (tutorID, studentID),
    FOREIGN KEY (studentID) REFERENCES Member(memberID) ON DELETE CASCADE, 
    FOREIGN KEY (tutorID) REFERENCES Member(memberID) ON DELETE CASCADE
);
INSERT INTO Review (tutorID, studentID, comment) VALUES (2, 3, "very patient"), (6, 1, "good sessions");

CREATE TABLE IF NOT EXISTS TutorCourse (
    tutorID INT,
    courseID VARCHAR(255) NOT NULL,
    PRIMARY KEY (tutorID, courseID),
    FOREIGN KEY (tutorID) REFERENCES Member(memberID) ON DELETE CASCADE, 
    FOREIGN KEY (courseID) REFERENCES Course(courseID) ON DELETE CASCADE
);

INSERT INTO TutorCourse (tutorID, courseID) VALUES (2, "COMP2340"), (2, "COMP3161");



SELECT
    preferenceID,
    GROUP_CONCAT(preferenceDetailID ORDER BY preferenceDetailID) AS preferenceDetailIDs,
    GROUP_CONCAT(preferenceDetailName ORDER BY preferenceDetailID) AS preferenceDetailNames
FROM
    preferencedetail
GROUP BY
    preferenceID;
