import { getStringParam } from ".";

export default function utility(string, dataItem) {
    let param = getStringParam(string);
    return string.replace(":" + param, dataItem[param]);
}
