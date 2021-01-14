import React, { useState } from "react";
import DualLabelFormControl from "./dual-label-form-control";
import { MenuItem, Select } from "@material-ui/core";

const Control = ({ items = [], item, initialValue = null, ...props }, ref) => {
    const [value, setValue] = useState(initialValue ? initialValue.value : "");

    const menuProps = {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },

        getContentAnchorEl: null
    };
    return (
        <DualLabelFormControl {...props}>
            <input type="hidden" value={value} name={props.name} ref={ref} />

            <Select
                className="form-text-input dual-label-dropdown"
                classes={{
                    root: "dual-label-dropdown-root",
                    select: "dual-label-dropdown-select",
                    selectMenu: "dual-label-dropdown-selectMenu"
                }}
                inputProps={props.readonly && { readOnly: true }}
                value={value}
                onChange={event => {
                    setValue(event.target.value);
                }}
                MenuProps={menuProps}
                disabled={props.loading}
            >
                {/* {!props.readonly && <MenuItem value="">Delete</MenuItem>} */}
                {!props.readonly &&
                    items.map((item, key) => {
                        return (
                            <MenuItem key={key} value={item.value}>
                                {item.label}
                            </MenuItem>
                        );
                    })}

                {props.readonly && (
                    <MenuItem value={initialValue.value}>
                        {initialValue.label}
                    </MenuItem>
                )}
            </Select>
        </DualLabelFormControl>
    );
};

const getInitialValue = props => {
    if (props.initilaValue) {
        return props.initilaValue.value;
    } else {
        return "";
    }
};

export default React.forwardRef(Control);
