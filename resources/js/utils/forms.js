import { getIndexOfMatchInsideArray } from "./findObject";

export const _getNextFocusIndex = (
    refs,
    currentIndex,
    attrValue = null,
    attr = "name"
) => {
    // console.log("_getFocusIndex", refs, currentIndex, attrValue);
    let _index = 0;
    if (attrValue) {
        // console.log("_getFocusIndex targetFieldName", targetFieldName);
        _index = getIndexOfMatchInsideArray(refs, attr, attrValue);
    } else {
        // console.log("_getFocusIndex", currentIndex, refs.length);
        if (currentIndex + 1 < refs.length) {
            for (_index = currentIndex + 1; _index < refs.length; _index++) {
                const element = refs[_index];
                if (!element.disabled) {
                    // console.log("focusNext", element.name, index);
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
