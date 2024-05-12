// TODO:
// put overlapping check in a function since it's used multiple times

const m1 = {
    1: [['08:00', '10:00'], ['09:30', '11:30'], ['13:00', '15:00']],
    2: [['09:00', '11:00'], ['14:00', '16:00']]
};

const m2 = {
    1: [['09:00', '12:00'], ['14:00', '16:00']],
    2: [['08:30', '10:30'], ['12:30', '14:30']]
};

const m3 = {
    1: [['07:00', '09:00'], ['11:00', '13:00'], ['15:30', '17:30']],
    3: [['10:00', '12:00'], ['14:30', '16:30']]
};

const m4 = {
    1: [['10:30', '12:30']],
    2: [['09:30', '11:30'], ['13:00', '15:00']]
};

const m5 = {
    1: [['08:30', '10:30'], ['11:30', '14:30']],
    2: [['08:00', '11:00'], ['13:00', '16:00']]
};

const m6 = {
    1: [['08:00', '11:00'], ['13:00', '16:00']],
    2: [['07:00', '09:00'], ['12:00', '14:00'], ['15:30', '17:30']]
};

const m7 = {
    1: [['07:30', '09:30'], ['12:00', '14:00'], ['15:30', '17:30']],
    2: [['09:00', '12:00'], ['14:30', '16:30']]
};

const m8 = {
    1: [['10:00', '12:00'], ['14:30', '16:30']],
    2: [['08:30', '10:30'], ['11:00', '13:00'], ['14:30', '16:30']]
};

const m9 = {
    1: [['08:30', '10:30'], ['11:00', '13:00'], ['14:30', '16:30']],
    2: [['09:00', '11:00'], ['12:30', '14:30'], ['15:00', '17:00']]
};

const m10 = {
    1: [['09:00', '11:00'], ['12:30', '14:30'], ['15:00', '17:00']],
    2: [['07:30', '10:30'], ['12:00', '15:00']]
};

function mergeOverlappingIntervals(memberSchedule) {
    for (key in memberSchedule){
        const intervals = memberSchedule[key];
        // sort intervals for the day from earliest to latest
        const sortedIntervals = intervals.sort((a, b) => a[0].localeCompare(b[0]));

        const mergedIntervals = [];
        for (const interval of sortedIntervals) {
            let lastMergedInterval = mergedIntervals.length - 1;
            // If no overlap, add to list of intervals
            // if first interval ended before second one started or second one started after first one ended (if array isnt sorted - mergedIntervals[lastMergedInterval][0] > interval[1]) then there's no overlap
            if (!mergedIntervals.length || mergedIntervals[lastMergedInterval][1] < interval[0]) {
                mergedIntervals.push(interval);
            } else {
                // If the current interval overlaps with the last merged interval, merge them
                mergedIntervals[lastMergedInterval] = [mergedIntervals[lastMergedInterval][0], mergedIntervals[lastMergedInterval][1].localeCompare(interval[1]) == -1 ? interval[1] : mergedIntervals[lastMergedInterval][1]]        }
        }
        memberSchedule[key] = mergedIntervals;
    }
    return memberSchedule;
}

// Helper function to parse time strings and convert them to milliseconds
function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return (parseInt(hours, 10) * 60 + parseInt(minutes, 10)) * 60 * 1000;
}

function checkForOverlappingIntervals(student, tutor) {
    for (day in student){
        if (tutor.hasOwnProperty(day)){
            sIntervals = student[day];
            tIntervals = tutor[day];

            for (sInterval of sIntervals){
                for (tInterval of tIntervals){
                    let first = null;
                    let second = null;
                    sInterval[0].localeCompare(tInterval) == -1 ? (first = sInterval, second = tInterval) : (first = tInterval, second = sInterval);
                    // if first interval ends same time or before next one starts, there's no overlap
                    if (first[1] <= second[0]) {
                        continue;
                    } else {
                        // find number of hours overlapping (max start time - min end time)
                        maxStart = sInterval[0].localeCompare(tInterval[0]) == -1 ? tInterval[0] : sInterval[0];
                        minEnd = sInterval[1].localeCompare(tInterval[1]) == -1 ? sInterval[1] : tInterval[1];
                        
                        // Get number of hours of overlap
                        const overlapDuration = Math.max(0, parseTime(minEnd) - parseTime(maxStart)) / (1000 * 60 * 60);
                         
                        if (overlapDuration >= 1){
                            console.log([sInterval, tInterval]);
                            return true;
                        } else {
                            continue;
                        }
                    }
            }
        }
    }
    return false;
}
}

sList = [m1, m2];
tList = [m3, m4, m5, m6, m7, m8, m9, m10];
mList = sList.concat(tList);

for (member of mList){
    mergeOverlappingIntervals(member);
}

for (s in sList){
    for (t in tList){
        let student = sList[s];
        let tutor = tList[t];
        if (checkForOverlappingIntervals(student, tutor)) {
            console.log([s, t])
        }
    }
}