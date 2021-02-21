import React from "react";
import { t } from "../../utils";

function _link({ label, preset, ...props }) {
    let tagClass = "";
    let displayClass = "";
    switch (preset) {
        case "notinstalled":
            displayClass = "notinstalled";
            tagClass = "notinstalled";
            break;
        case "notactivated":
            displayClass = "notactivated";
            tagClass = "notactivated";
            break;

        default:
            break;
    }

    return (
        <a
            style={props.style}
            className={
                props.className
                    ? props.className + " disabled " + displayClass
                    : " panel-link disabled " + displayClass
            }
        >
            <div>{label}</div>
            <div className={"link-tag " + tagClass}>
                {t("labels." + preset)}
            </div>
        </a>
    );
}

export default _link;
