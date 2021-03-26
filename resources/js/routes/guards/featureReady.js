import { LocalGasStation } from "@material-ui/icons";
import {
    FeatureRequiredRights,
    getFeatureActivated,
    getFeatureInstalled,
    getIsAllowed,
    getObjectFromArray
} from "../../utils";
import { FEATURE_ACTIVATED, FEATURE_READY } from "./types";

export default function _featureReady(to, from, next) {
    let _featureSlug = to.meta[FEATURE_READY];
    // console.log("_featureReady called for", _featureSlug);

    if (_featureSlug != null) {
        let requiredRights = FeatureRequiredRights(_featureSlug);
        // console.log("_featureReady", requiredRights);

        if (!getFeatureInstalled(_featureSlug)) {
            // console.log("not installed");
            next.redirect("/notinstalled");
        } else if (!getFeatureActivated(_featureSlug)) {
            // console.log("not activated");
            next.redirect("/notactivated");
        } else if (requiredRights != [] && !getIsAllowed(requiredRights)) {
            next.redirect("/unathorized");
        } else {
            // console.log("permitted");
            next();
        }
    } else {
        // console.log("no permission needed");
        next();
    }
}

function _featureRequiredRights(featureSlug) {}
