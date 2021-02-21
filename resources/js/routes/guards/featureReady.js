import { getFeatureActivated, getFeatureInstalled } from "../../utils";
import { FEATURE_ACTIVATED, FEATURE_READY } from "./types";

const _featureReady = (to, from, next) => {
    if (
        to.meta[FEATURE_READY] != null &&
        !getFeatureInstalled(to.meta[FEATURE_READY])
    ) {
        next.redirect("/notinstalled");
    } else if (
        to.meta[FEATURE_READY] != null &&
        !getFeatureActivated(to.meta[FEATURE_READY])
    ) {
        next.redirect("/notactivated");
    }
    next();
};

export default _featureReady;
