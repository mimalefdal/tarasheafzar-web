import React from "react";
import "../../styles/text-input-dual-label.css";
import { t } from "../../utils";

function Control(props, ref) {
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

    return (
        <div className="input-block">
            <div className="dual-label-box">
                <label className="text-input-label">{props.label}</label>
                <label className="text-input-label text-input-label-comment">
                    {props.labelComment}
                </label>
            </div>
            <div className="input-with-error-box">
                <input
                    className="form-text-input"
                    name={props.name}
                    placeholder={props.placeholder}
                    ref={ref}
                />
                <div className="input-error">
                    {errorMessage}
                    {backendErrorMessage}
                </div>
            </div>
        </div>
    );
}

export default React.forwardRef(Control);
