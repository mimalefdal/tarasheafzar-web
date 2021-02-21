import { getFeatureActivated } from "../../utils";
import { FEATURE_ACTIVATED } from "./types";

const _featureActivated = (to, from, next) => {
    if (
        to.meta[FEATURE_ACTIVATED] != null &&
        !getFeatureActivated(to.meta[FEATURE_ACTIVATED])
    ) {
        next.redirect("/notactivated");
    }
    next();
};

export default _featureActivated;
