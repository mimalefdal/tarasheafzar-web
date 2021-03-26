const _getIsAllowed = rights => {
    let _allowed = true;
    if (!rights || rights == []) return _allowed;
    const userRights = JSON.parse(sessionStorage.getItem("rights"));

    // console.log("_getIsAllowed", rights);

    if (Array.isArray(rights)) {
        rights.forEach(right => {
            // console.log(
            //     "_getIsAllowed",
            //     right,
            //     userRights.indexOf(right) == -1
            // );

            if (userRights.indexOf(right) == -1) {
                _allowed = false;
            }
        });
    } else {
        _allowed = userRights.indexOf(rights) != -1;
        // if (right == "" || rights.indexOf(right) != -1) return true;
    }
    // console.log(_allowed);
    return _allowed;
};
export default _getIsAllowed;
