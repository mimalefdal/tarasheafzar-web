const _getFeatureInstalled = feature => {
    const features = JSON.parse(sessionStorage.getItem("features")).map(
        item => item.slug
    );
    // console.log("_getFeatureInstalled", feature, features);
    if (features.indexOf(feature) != -1) return true;
    // console.log(feature, "Forbidden");
    return false;
};

export default _getFeatureInstalled;
