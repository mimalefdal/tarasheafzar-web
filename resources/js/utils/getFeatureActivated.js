import React, { useContext } from "react";
import { getMatchIndexOf } from ".";
import AppContext from "../context/appContext";

// function _getFeatureActivated(feature, features = null) {
//     console.log("_getFeatureActivated", feature);
//     if (!features) features = useContext(AppContext).features;
//     console.log("_getFeatureActivated", features);

//     // let _activated = getMatchIndexOf(features, "slug", feature) != -1;
//     // console.log("_getFeatureActivated", feature, _activated);
//     return true;
// }

const _getFeatureActivated = (feature, features = null) => {
    if (!features)
        features = JSON.parse(sessionStorage.getItem("features")).map(
            item => item.activation && item.slug
        );

    return features.indexOf(feature) != -1;
};

export default _getFeatureActivated;
