import { currentLang } from ".";
import { fa_trans, en_trans } from "../utils/lang";

function translate(key, attr = null) {
    // console.log(key, keys, lang);

    var keys = key.split(".");
    var lang = currentLang();
    var trans;
    var result;

    switch (lang) {
        case "fa":
            trans = fa_trans(key);
            // console.log(trans);
            if (trans) {
                result = fa_trans(key);
            } else {
                result = "_".concat(key);
            }
            break;
        case "en":
            trans = en_trans(key);
            // console.log(trans);
            if (trans) {
                result = en_trans(key);
            } else {
                result = "_".concat(key);
            }
            break;
        default:
            result = key;
            break;
    }

    if (attr != null) {
        Object.keys(attr).map(key => {
            // console.log(key, attr[key]);
            result = result.replace(":" + key, attr[key]);
        });
    }

    return result;
}
export default translate;
