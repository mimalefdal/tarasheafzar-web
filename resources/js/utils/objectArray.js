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

export const removeFromArray = (array, attr, targetValues) => {
    // console.log(array, targetValues);
    targetValues.forEach(value => {
        array = array.filter(item => item[attr] != value);
    });
    // console.log(array);
    return array;
};

export const equals = (a, b) => {
    // console.log(a, b);
    // return a.length === b.length && a.every((v, i) => v === b[i]);
    return (
        a.length === b.length &&
        a.every((v, i) => getIndexOfMatchInsideArray(b, "id", v.id) != -1)
    );
};

export const pluckSet = (items, attr = "id") => {
    return items.map(item => {
        return { [attr]: item[attr] };
    });
};
