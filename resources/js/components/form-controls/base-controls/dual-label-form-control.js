import React from "react";
import "../../../styles/dual-label-inputs.css";

import { t } from "../../../utils";

function DualLabelFormControl(props) {
    // console.log(props);
    const errorMessage = props.errors && props.errors[props.name] && (
        <div className="input-error-message">
            {t("errors." + props.errors[props.name]["type"])}
        </div>
    );

    const backendErrorMessage = props.backendErrors &&
        props.backendErrors[props.name] && (
            <div className="input-error-message">
                {props.backendErrors[props.name][0]}
            </div>
        );
    const labelComment = props.labelComment && (
        <label className="text-input-label text-input-label-comment">
            {props.labelComment}
        </label>
    );
    return (
        <div className="input-block">
            <div className="dual-label-box">
                <label className="text-input-label">{props.label}</label>
                {labelComment}
            </div>
            <div className="input-with-error-box">
                {props.children}
                <div className="input-error">
                    {errorMessage}
                    {backendErrorMessage}
                </div>
            </div>
        </div>
    );
}

export default DualLabelFormControl;
