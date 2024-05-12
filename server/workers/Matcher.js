
// Need them in this format::
// const bipartite_graph = [[5.110256, 0.566667, 3.323077],
//                    [0.85, 8.15, 0.00],
//                    [0.7, 0.00, 0.2]]

// 3 students and 3 tutors - try for no element below 5 (would need to add check in scorer for that)
const bipartite = [
    [5, 6, 7], // id:1, course: comp3161
    [8, 5, 8], // id: 4, course: comp1161
    [6, 8, 10], // id: 7, courseL info3165
]

// 3 students and 5 tutors
const bipartite_unbalanced = [
    [5, 6, 7, 1, 5],
    [8, 5, 8, 2, 1],
    [6, 8, 10, 3, 4],
]

const match = (bipartite) => {
    const reducedXMatrix = buildReducedXMatrix(bipartite);
    const reducedYMatrix = buildReducedYMatrix(reducedXMatrix);
    const match = findBestTemporalMatch(reducedYMatrix);
    console.log(reducedYMatrix);
    console.log(match);

}

// 1:  row reduction: subtract largest in each row from every row
const buildReducedXMatrix = (bipartite) => {
    return bipartite.map(row => {
        const maxInRow = Math.max(...row); 
        return row.map(val => val - maxInRow); 
    });
}

// 2: column reduction: subtract largest in each column from every column
const buildReducedYMatrix = (reducedXMatrix) => {
    const transposedMatrix = transposeMatrix(reducedXMatrix);
    const reducedYMatrix = buildReducedXMatrix(transposedMatrix);
    return transposeMatrix(reducedYMatrix);
}

// 3: find best match starting from who signed up first
const findBestTemporalMatch = (reducedYMatrix) => {
    const matchedColumns = new Set(); // To keep track of matched columns
    const matches = [];

    reducedYMatrix.forEach((row, i) => {
        const zeroIndices = row.reduce((indices, val, j) => {
            if (val === 0) {
                indices.push(j);
            }
            return indices;
        }, []);

        if (zeroIndices.length === 1) {
            const columnIndex = zeroIndices[0];
            if (!matchedColumns.has(columnIndex)) {
                matches.push([i, columnIndex]);
                matchedColumns.add(columnIndex);
            }
        }
    });

    return matches;
}

// helper function to check if student's best match (who was taken by another student) has any remaining slots.
const checkRemainingSlots = () => {

}

// helper function to transpose matrix
const transposeMatrix = (matrix) => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
};

console.log(match(bipartite));

