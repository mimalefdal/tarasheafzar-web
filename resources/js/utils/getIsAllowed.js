const _getIsAllowed = right => {
    const rights = JSON.parse(sessionStorage.getItem("rights"));
    if (rights.indexOf(right) != -1) return true;
    // console.log(right, "Forbidden");
    return false;
};
export default _getIsAllowed;
