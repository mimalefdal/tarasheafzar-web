import react, { useContext } from "react";

function _getLocale() {
    return sessionStorage.getItem("currentLanguage");
}
export default _getLocale;
