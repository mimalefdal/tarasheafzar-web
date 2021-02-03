import langData from "./strings.json";

const strings = key => {
    var keys = key.split(".");
    let subset = keys[0];
    let tag = keys[1];

    if (langData[subset]) {
        return langData[subset][tag];
    } else {
        return false;
    }
};
export default strings;
