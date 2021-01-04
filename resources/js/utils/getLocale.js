import react, { useContext } from "react";

function getLocale() {
    return sessionStorage.getItem("currentLanguage");
}
export default getLocale;
