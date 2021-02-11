// import { slice } from "../utils/redux/navSlice";

export default function utility(string) {
    let from = string.indexOf(":");
    let parameter = string.slice(from + 1);
    let to = parameter.indexOf("/");
    if (to > 0) parameter = parameter.slice(0, to);
    return parameter;
}
