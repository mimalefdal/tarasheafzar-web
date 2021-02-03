import { currentLang } from ".";
import { fa_trans, en_trans } from "../utils/lang";

function translate(key) {
    // console.log(key, keys, lang);

    var keys = key.split(".");
    var lang = currentLang();
    var trans;

    switch (lang) {
        case "fa":
            trans = fa_trans(key);
            // console.log(trans);
            if (trans) {
                return fa_trans(key);
            } else {
                return "_".concat(key);
            }
            break;
        case "en":
            trans = en_trans(key);
            // console.log(trans);
            if (trans) {
                return en_trans(key);
            } else {
                return "_".concat(key);
            }
            break;
        default:
            return key;
            break;
    }
}
export default translate;
