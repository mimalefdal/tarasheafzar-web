function getLocale() {
    // console.log(localStorage.getItem("currentLanguage"));
    return sessionStorage.getItem("currentLanguage");
}
export default getLocale;
