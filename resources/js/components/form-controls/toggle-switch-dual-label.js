import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";

const Control = ({ name, isOn, label, labelComment }, ref) => {
    const [value, setValue] = useState(false);
    isOn = value;
    return (
        <>
            <div className="input-block">
                <div className="dual-label-box">
                    <label className="text-input-label">{label}</label>
                    <label className="text-input-label text-input-label-comment">
                        {labelComment}
                    </label>
                </div>

                <div className="input-with-error-box">
                    <Switch
                        checked={isOn}
                        onChange={() => {
                            setValue(!value);
                        }}
                        color="primary"
                        name={name}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        inputRef={ref}
                    />
                </div>
            </div>
        </>
    );
};

export default React.forwardRef(Control);
