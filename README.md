# Campus Connect

Campus Connect is a tutoring platform designed to connect Jamaican university students with qualified tutors through a centralized system. The platform focuses on improving access to academic support using a personalized tutor–student matching system.

This project was developed as an undergraduate capstone project. 

---

## Preface

University students in Jamaica frequently struggle to access reliable and qualified tutors due to the lack of a centralized platform. In the dynamic environment of university life, locating a tutor that matches both academic needs and scheduling availability can be difficult.

Campus Connect was developed to address this problem by providing a platform where students and tutors can be connected through personalized matching based on preferences and scheduling. 

---

## System Overview

The platform consists of two main components:

- **Client** – Frontend interface used by students and tutors to interact with the platform.
- **Server** – Backend responsible for authentication, scheduling, preference modelling, and tutor matching.

Core platform features include:

- Student and tutor account management
- Preference modelling for learning and communication styles
- Tutor–student matching based on multiple criteria
- Session scheduling
- Lesson plan management
- Help ticket system
- Event/session tracking

---

## Architecture

The repository is structured into a client-server architecture.

```
.
├── client
│
└── server
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    ├── routers
    ├── services
    ├── workers
```

### Server Components

**controllers**  
Handle HTTP requests and responses and delegate operations to service-layer functions.

**middleware**  
Contains request processing logic such as authentication and protected route handling.

**models**  
Defines database models and schema relationships using Sequelize.

**routers**  
Defines API routes and maps endpoints to controller methods.

**services**  
Implements core business logic and database interactions.

**workers**  
Contains algorithmic components used for tutor–student matching and scheduling.

---

## Tutor–Student Matching Algorithm

The tutor–student matching system uses **Multi-Criteria Decision Analysis (MCDA)** techniques to establish a cost matrix, which allows for the evaluation of compatibility between a student and a set of tutors. Each tutor is assigned a compatibility score based on the similarity between their preferences and the student's preferences.

Preferences are represented as numerical vectors across several categories:

- Primary learning style (visual, auditory, kinesthetic)
- Secondary learning preferences (social, solitary)
- Communication preferences (video, phone, chat)  

Each category contains weighted values representing how strongly a user prefers each option.

### Matching Process

The matching algorithm evaluates tutors in several steps.

### 1. Preference Representation

Student and tutor preferences are represented as matrices where each row corresponds to a preference category.

Example student matrix:

```
[
  [5, 5, 0],
  [8, 2],
  [8, 0, 2]
]
```

These values indicate the relative importance of each preference dimension.

### 2. Preference Similarity Calculation

To measure similarity between a student and tutor, the algorithm calculates the absolute difference between corresponding preference values.

The difference is transformed into a similarity score using:

```
similarity = 10 − |student_value − tutor_value|
```

This produces a compatibility score between **0 and 10**, where:

- **10** represents a perfect match
- **0** represents maximum difference

The result is a matrix representing the similarity between the student and tutor for each preference dimension.

### 3. Normalization

To ensure scores are comparable across multiple tutors, the matrices are normalized using **sum normalization**.

For each position in the preference matrix:

```
normalized_value = value / sum_of_column_values
```

This step ensures that preference scores remain proportional while preventing large values from dominating the ranking process.

### 4. Weighted Aggregation

Each preference category can be assigned a weight to reflect how important that criterion is to the student.

The normalized scores are multiplied by their corresponding weights, allowing the system to prioritize factors such as learning style or communication method.

These weights are set by the student when inputting their preferences.

### 5. Final Compatibility Score

After weighting, the values are aggregated to produce a final compatibility score for each tutor.

Tutors are then ranked based on this score, and the highest scoring tutors are selected as the most suitable matches.

### Additional Matching Factors

The system also supports integrating additional compatibility signals such as personality matching.

For example, MBTI personality compatibility can be represented as a lookup table containing compatibility percentages between personality types. These values can be converted into numerical scores and incorporated into the overall matching calculation.

### Algorithm Characteristics

- **Multi-criteria evaluation** considers multiple student and tutor attributes such as learning style and communication preferences when determining compatibility.

- **Similarity-based scoring** converts preference differences into compatibility values, where smaller differences between tutor and student preferences produce higher match scores.

- **Matrix normalization** ensures compatibility scores remain comparable across all tutors by scaling values relative to the overall candidate pool.

- **Weighted preference prioritization** allows certain criteria to be emphasized based on how important they are to the student.

- **Rank-based selection** aggregates the weighted scores to produce a final compatibility score and ranks tutors from most to least compatible.

---

## Scheduling

Tutor–student session scheduling is implemented using a greedy interval scheduling approach. The objective is to identify compatible time intervals between tutors and students while ensuring that sessions do not overlap and meet a minimum duration requirement.

### Scheduling Process

1. **Collect Availability Intervals**

   Each user provides availability which is stored as time intervals grouped by day.

   Example:

   ```
   Monday: [08:00–10:00], [13:00–15:00]
   Tuesday: [09:00–11:00]
   ```

2. **Merge Overlapping Intervals**

   Availability intervals are first normalized by merging overlapping or adjacent time ranges. This ensures fragmented availability windows are treated as continuous blocks.

   Example:

   ```
   [08:00–10:00], [09:30–11:30]
   ```

   becomes

   ```
   [08:00–11:30]
   ```

3. **Compare Student and Tutor Schedules**

   For each student–tutor pair, the system compares their availability intervals for each day. Only days that exist in both schedules are considered.

4. **Detect Overlapping Intervals**

   Two intervals overlap when:

   ```
   startA < endB AND startB < endA
   ```

   If this condition holds, the algorithm calculates the overlapping time window.

5. **Calculate Overlap Duration**

   The overlapping duration is determined by:

   ```
   overlap = min(endA, endB) − max(startA, startB)
   ```

   Time values are converted to milliseconds to compute accurate duration differences.

6. **Minimum Session Constraint**

   Only overlaps with a duration of **one hour or more** are considered valid tutoring sessions.

7. **Generate Candidate Matches**

   When a valid overlap is detected, the tutor–student pair is recorded as a schedulable match for that time window.

### Algorithm Characteristics

- **Greedy processing** ensures efficient comparison of time intervals.
- **Preprocessing through interval merging** simplifies schedule evaluation.
- **Time normalization** allows precise overlap calculations.
- **Minimum duration constraints** ensure sessions meet tutoring requirements.

---

## Database

The backend uses a relational database to store user data, preferences, tutoring sessions, and scheduling information.

The schema definition is included in:

```
schema.sql
```

---

## Running the Server

Clone the repository:

```bash
git clone https://github.com/tia-s/campus_connect_capstone
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```
HOST=
USER=
PASSWORD=
DATABASE=
JWT_SECRET=
```

Start the server:

```bash
node app.js
```

## Note on Matching Algorithm Implementation

This repository contains the experimental implementation and supporting components for the tutor–student matching system, including preference matrix construction, similarity scoring, and schedule compatibility checks.

## Note on Matching Algorithm Implementation

The tutor–student matching problem in Campus Connect was framed as an **assignment problem**, solved using the **Hungarian Method** where the objective is to determine the optimal pairing between students and tutors based on multiple preference criteria and schedule compatibility.

This repository contains the experimental implementation and supporting components for the matching system, including preference matrix construction, similarity scoring, and schedule compatibility checks. 

The final implementation for constructing the global cost matrix and executing the Hungarian assignment algorithm was part of the final system design but is not included in this repository. The algorithm-related files available here therefore represent the development and prototyping stage of the matching logic.

---

## License

This project is licensed under the MIT License.
