
// Need them in this format::
const student = [[50, 50, 0], [80, 20], [80, 0, 20], [100, 0]]

const tutorsList = [
    [[60, 40, 0], [20, 80], [30, 70, 0], [100, 0]],
    [[10, 70, 20], [80, 20], [30, 70, 0], [20, 80]],
    [[90, 10, 0], [30, 70], [40, 50, 10], [40, 60]],
]

// tutor's match with student for every tutor
const compatabilityList = [7, 6, 4]

// students' preference for each category + add 0.5 for mbti
const preferenceWeights = [1, 0.5, 0, 1]
preferenceWeights.push(0.5);


const score = (student, tutors, compatability, weights) => {
    const deltaMatrix = buildDeltaMatrix(student, tutors);
    const augmentedMatrix = buildAugmentedMatrix(deltaMatrix, compatability);
    const normalizedMatrix = buildNormalizedMatrix(augmentedMatrix);
    const optimizedMatrix = buildOptimizedMatrix(normalizedMatrix, weights);
    const compatabilityMatrix = buildCompatabilityMatrix(optimizedMatrix);

    return compatabilityMatrix;
}

// 1:  absolute difference
const buildDeltaMatrix = (student, tutors) => {
    return tutors.map((tutor) => student.map((row, i) => row.map((val, j) => 10 - Math.abs(val - tutor[i][j]))));
};

// 2: add more preferences: add mbti match
const buildAugmentedMatrix = (deltaMatrix, compatability) => {
    for (let i = 0; i < deltaMatrix.length; i++) {
        deltaMatrix[i].push([compatability[i]]);
    }
    return deltaMatrix;
}

// 3: normalize
const buildNormalizedMatrix = (augmentedMatrix) => {
    const sumMatrix = calculateSumMatrix(augmentedMatrix);
    return augmentedMatrix.map(tutor => tutor.map((row, i) => row.map((val, j) => val / sumMatrix[i][j])));
}

// 4: multiply by preference weights
const buildOptimizedMatrix = (normalizedMatrix, weights) => {
    return normalizedMatrix.map(matrix => 
        matrix.map((row, i) => row.map((val, j) => val * weights[i]))
    );
}

// 4: sum values to get final score
const buildCompatabilityMatrix = (optimizedMatrix) => {
    return optimizedMatrix.map(matrix =>
        matrix.reduce((acc, row) =>
            acc + row.reduce((sum, val) => sum + val, 0), 0)
    );
}

// helper function to sum matrix
const calculateSumMatrix = (matrix) => {
    return matrix.reduce((acc, tutor) => {
        tutor.forEach((row, i) => {
            row.forEach((val, j) => {
                acc[i][j] += val;
            });
        });
        return acc;
    }, [[0, 0, 0], [0, 0], [0, 0, 0], [0, 0], [0]]);
}

console.log(score(student, tutorsList, compatabilityList, preferenceWeights))

