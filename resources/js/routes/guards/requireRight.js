import { getIsAllowed } from "../../utils";
import { REQUIRED_RIGHT } from "./types";

const _requireRight = (to, from, next) => {
    if (
        to.meta[REQUIRED_RIGHT] != null &&
        !getIsAllowed(to.meta[REQUIRED_RIGHT])
    ) {
        next.redirect("/unathorized");
    }
    next();
};
export default _requireRight;
