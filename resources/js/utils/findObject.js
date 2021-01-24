export const findObjectInsideArray = (array, attr, targetValue) => {
    // console.log("findObjectInsideArray", array, attr, targetValue);
    return array.find(object => object[attr] == targetValue);
};

export const getIndexOfMatchInsideArray = (array, attr, targetValue) => {
    // console.log("getIndexOfMatchInsideArray", array, attr, targetValue);
    return array.indexOf(findObjectInsideArray(array, attr, targetValue));
};
