import React from "react";
import { t } from "../../utils";
import DualLabelFormControl from "./base-controls/dual-label-form-control";

function Control(props, ref) {
    // console.log(props);
    var { ...props } = props;
    return (
        <DualLabelFormControl {...props}>
            <input
                className="form-text-input"
                name={props.name}
                placeholder={props.placeholder}
                ref={ref}
                autoComplete="off"
                disabled={props.disabled}
            />
        </DualLabelFormControl>
    );
}

export default React.forwardRef(Control);
