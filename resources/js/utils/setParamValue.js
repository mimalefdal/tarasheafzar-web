import { getStringParam } from ".";

export default function _utility(string, dataItem) {
    let param = getStringParam(string);
    return string.replace(":" + param, dataItem[param]);
}
