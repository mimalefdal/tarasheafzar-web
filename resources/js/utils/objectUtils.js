export const countObjectChildEntries = object => {
    let count = 0;
    Object.values(object).map(entry => {
        count = count + entry.length;
    });
    return count;
};
