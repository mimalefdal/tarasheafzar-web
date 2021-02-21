import { getFeatureInstalled } from "../../utils";
import { FEATURE_INSTALLED } from "./types";

const _featureInstalled = (to, from, next) => {
    if (
        to.meta[FEATURE_INSTALLED] != null &&
        !getFeatureInstalled(to.meta[FEATURE_INSTALLED])
    ) {
        next.redirect("/notinstalled");
    }
    next();
};

export default _featureInstalled;
