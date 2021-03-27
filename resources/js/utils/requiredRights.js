import { getObjectFromArray } from ".";

export function _getFeatureRequiredRights(featureSlug) {
    // console.log("_featureRequiredRights called for", featureSlug);
    let _features = JSON.parse(sessionStorage.getItem("features"));
    // console.log("_featureRequiredRights", _features);
    let _feature = getObjectFromArray(_features, "slug", featureSlug);
    // console.log("_featureRequiredRights", _feature);
    if (_feature) {
        let _rights = _feature.permissions;
        // console.log("_featureRequiredRights", _rights);
        return _rights;
    }
    console.log("_featureRequiredRights:unknown feature", featureSlug);
    return ["unknown-feature"];
}

export function _getToolRequiredRights(toolSlug) {}

export function _getOperationRequiredRights(operationSlug) {}
