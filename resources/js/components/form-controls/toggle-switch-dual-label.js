import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import DualLabelFormControl from "./base-controls/dual-label-form-control";

const Control = (props, ref) => {
    const [value, setValue] = useState(props.isOn);
    var { ...props } = props;

    return (
        <DualLabelFormControl {...props}>
            <Switch
                checked={value}
                onChange={() => {
                    setValue(!value);
                }}
                color="primary"
                name={props.name}
                inputRef={ref}
            />
        </DualLabelFormControl>
    );
};

export default React.forwardRef(Control);
