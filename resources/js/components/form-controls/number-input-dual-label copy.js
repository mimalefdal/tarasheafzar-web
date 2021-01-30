import { PinDropSharp } from "@material-ui/icons";
import React from "react";
import { t } from "../../utils";
import DualLabelFormControl from "./dual-label-form-control";

function Control(props, ref) {
    // console.log(props.lang == "en" ? " latin" : "");
    // console.log("textInputDualLabel Props", props);

    const latin = props.lang == "en" ? " latin" : "";
    // var { ...props } = props;
    return (
        <DualLabelFormControl {...props}>
            <input
                type="number"
                min={
                    props.numberProps &&
                    props.numberProps.min &&
                    props.numberProps.min
                }
                max={
                    props.numberProps &&
                    props.numberProps.max &&
                    props.numberProps.max
                }
                step={
                    props.numberProps &&
                    props.numberProps.step &&
                    props.numberProps.step
                }
                defaultValue={props.value ? props.value : null}
                className={"form-text-input" + latin}
                name={props.name}
                placeholder={props.placeholder}
                ref={ref}
                autoComplete="off"
                disabled={props.disabled}
                onChange={props.onChange}
                onFocus={props.onFocus && props.onFocus}
            />
        </DualLabelFormControl>
    );
}

export default React.forwardRef(Control);
