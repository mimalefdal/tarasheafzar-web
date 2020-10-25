import { REQUIRED_RIGHT } from "../types";
import { getIsAllowed } from "../../../utils";

const requireRight = (to, from, next) => {
    if (
        to.meta[REQUIRED_RIGHT] != null &&
        !getIsAllowed(to.meta[REQUIRED_RIGHT])
    ) {
        next.redirect("unathorized");
    }
    next();
};
export default requireRight;
