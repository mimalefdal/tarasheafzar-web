export const findObjectInsideArray = (array, attr, targetValue) => {
    // console.log("findObjectInsideArray", array, attr, targetValue);
    return array.find(object => object[attr] == targetValue);
};

export const getIndexOfMatchInsideArray = (array, attr, targetValue) => {
    // console.log("getIndexOfMatchInsideArray", array, attr, targetValue);
    return array.indexOf(findObjectInsideArray(array, attr, targetValue));
};

export const existsInArray = (array, attr, targetValue) => {
    if (getIndexOfMatchInsideArray(array, attr, targetValue) == -1)
        return false;
    return true;
};
