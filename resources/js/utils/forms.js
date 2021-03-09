import { getIndexOfMatchInsideArray } from "./findObject";

export const _makeUpdatedValidValues = (
    currentLists,
    loadedLists,
    valueObject
) => {
    let _validValues = { ...currentLists };
    Object.keys(valueObject).map(key => {
        let _valueList = loadedLists[valueObject[key]];
        if (_valueList == "NoPossibleValue") {
            delete _validValues[key];
        } else {
            _validValues = {
                ..._validValues,
                [key]: _valueList
            };
        }
    });
    return _validValues;
};

export const _makeValueListedFieldsArray = (targetFields, selectedValue) => {
    let fields = [];
    if (selectedValue)
        Object.keys(targetFields).map(key => {
            let _field =
                targetFields[key] == ""
                    ? selectedValue
                    : targetFields[key] + "." + selectedValue;
            fields.push(_field);
        });
    return fields;
};

export const _makeValueListObject = (targetFields, selectedValue) => {
    let _valuesObject = {};
    Object.keys(targetFields).map(key => {
        let _value =
            targetFields[key] == "" ? selectedValue : targetFields[key];
        _valuesObject = { ..._valuesObject, [key]: _value };
    });
    return _valuesObject;
};

export const _getNextFocusIndex = (
    refs,
    currentIndex,
    attrValue = null,
    attr = "name"
) => {
    // console.log("_getFocusIndex", refs.length, currentIndex, attrValue);
    let _index = 0;
    if (attrValue) {
        // console.log("_getFocusIndex targetFieldName", targetFieldName);
        _index = getIndexOfMatchInsideArray(refs, attr, attrValue);
    } else {
        if (currentIndex + 1 < refs.length) {
            // console.log("_getFocusIndex", currentIndex, refs.length);
            for (_index = currentIndex + 1; _index < refs.length; _index++) {
                let element = refs[_index];
                // console.log(element.name, element.disabled);
                if (!element.disabled) {
                    break;
                }
            }
        } else {
            //on last field
            // console.log("_getFocusIndex last Field");
            return -1;
        }
    }
    return _index;
};
