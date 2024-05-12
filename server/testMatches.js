const nj = require('numjs');

// s = [[primary_learning_style],[secondary_learning_style],[communication_method],[communication_style]]

// pad values to make arrays equal length--- mayyybe
// subtract 10 - absolute difference to merge student and tutor matrix into one indicating their preference match: 10 is a perfect match in that subcategory
// normalize by sum normalization to make all matrices comparable
// multiply by weight to personalize to how important student finds it
// add up values. higher score = higher match

const student = [[5, 5, 0], [8, 2], [8, 0, 2], [10, 0]]

const tutorsList = [
    [[6, 4, 0], [2, 8], [3, 7, 0], [10, 0]],
    [[1, 7, 2], [8, 2], [3, 7, 0], [2, 8]],
    [[9, 1, 0], [3, 7], [4, 5, 1], [4, 6]],
]

// 1: pad values: maybe not
// const padMatrix = (member) => {
//     // pad values of secondary learning style and communication style to make rows equal 3
//     member[1] = [...member[1], 0]
//     member[3] = [...member[3], 0]
// }

// 2: absolute difference: merges into one matrix
const absoluteDifference = (student, tutor) => {
    let final = [];

    for (let i=0; i <= student.length - 1; i++) {
        let interim = [];

        for (let j=0; j <= student[i].length - 1; j++){

            interim.push(10 - Math.abs(student[i][j] - tutor[i][j]));
        }
        final.push(interim);
    }
    return final;
}

absoluteTutorsList = []
for (tutor of tutorsList){
    absoluteTutorsList.push(absoluteDifference(student, tutor))
}
// add mbti to this
console.log(absoluteTutorsList)

// 3: sum normalization 
const sumNormalization = (tutors) => {
    // calculate sum matrix
    let sumMatrix = [[0, 0, 0], [0, 0], [0, 0, 0], [0, 0]];

    for (let tutor of tutors){
        for (let i=0; i <= tutor.length - 1; i++){
            for (let j=0; j <= tutor[i].length - 1; j++){
                sumMatrix[i][j] += tutor[i][j];
            }
        }
    }
    console.log(sumMatrix);

    for (let tutor of tutors){
        for (let i=0; i <= tutor.length - 1; i++){
            for (let j=0; j <= tutor[i].length - 1; j++){
                tutor[i][j] = tutor[i][j] / sumMatrix[i][j];
            }
        }
    }
    return absoluteTutorsList;
}

console.log(sumNormalization(absoluteTutorsList))

// const multiplyWeights = (tutorMatrix) => {
//     for (let row of tutorMatrix){
//         for (let i=0; i <= tutor.length - 1; i++){
//             for (let j=0; j <= tutor[i].length - 1; j++){
//                 tutor[i][j] = tutor[i][j] / sumMatrix[i][j];
//             }
//         }
//     }

// }


//  added after normalization: mbti_match_compared_to_tutor: need formula to make a 100% match equal to 10, etc so that it's comparable with normalized values

// could make key be a pair in alphabetical order to avoid duplicates
const mbtiMatchPercentage = {
    "ENFJ": {
      "ENFJ": 100,
      "ENFP": 85,
      "ENTJ": 80,
      "ENTP": 75,
      "ESFJ": 90,
      "ESFP": 70,
      "ESTJ": 65,
      "ESTP": 60,
      "INFJ": 95,
      "INFP": 80,
      "INTJ": 75,
      "INTP": 70,
      "ISFJ": 85,
      "ISFP": 65,
      "ISTJ": 60,
      "ISTP": 55
    },
    "ENFP": {
        // add rest
    },
  };
  console.log(mbtiMatchPercentage["ENFJ"]["ENFP"])
  