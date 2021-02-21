const _getFeatureActivated = feature => {
    const features = JSON.parse(sessionStorage.getItem("features")).map(
        item => item.activation && item.slug
    );
    // console.log("_getFeatureActivated", features);
    if (features.indexOf(feature) != -1) return true;
    // console.log(feature, "Forbidden");
    return false;
};

export default _getFeatureActivated;
