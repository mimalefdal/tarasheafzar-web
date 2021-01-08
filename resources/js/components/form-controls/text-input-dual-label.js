import React from "react";
import { t } from "../../utils";
import DualLabelFormControl from "./dual-label-form-control";

function Control(props, ref) {
    // console.log(props.lang == "en" ? " latin" : "");
    const latin = props.lang == "en" ? " latin" : "";
    var { ...props } = props;
    return (
        <DualLabelFormControl {...props}>
            <input
                defaultValue={props.value ? props.value : null}
                className={"form-text-input" + latin}
                name={props.name}
                placeholder={props.placeholder}
                ref={ref}
                autoComplete="off"
                disabled={props.disabled}
                onChange={props.onChange}
            />
        </DualLabelFormControl>
    );
}

export default React.forwardRef(Control);
