// Must Implement and use
// for example on position field on staff register form

import React, { useEffect, useState } from "react";
import DualLabelFormControl from "./dual-label-form-control";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const Control = (
    { options = [], initialOptionIndex = null, ...props },
    ref
) => {
    // console.log(
    //     "AutoCompleteDeualLabel",
    //     options,
    //     initialOptionIndex,
    //     options[initialOptionIndex],
    //     props
    // );

    const [value, setValue] = useState(
        initialOptionIndex != null ? options[initialOptionIndex] : null
    );
    const [inputValue, setInputValue] = useState("");

    return (
        <DualLabelFormControl {...props}>
            <input
                type="hidden"
                value={value != null ? value.value : ""}
                name={props.name}
                ref={ref}
            />
            <Autocomplete
                classes={{
                    inputRoot: "form-text-input dual-label-dropdown-root"
                }}
                fullWidth
                disabled={props.disabled && true}
                options={options}
                getOptionLabel={option => option.label}
                renderInput={params => <TextField {...params} />}
                value={value}
                onChange={(event, newValue) => {
                    // console.log("newValue", newValue);
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    // console.log("newInputValue", newInputValue);
                    setInputValue(newInputValue);
                }}
            />
        </DualLabelFormControl>
    );
};

export default React.forwardRef(Control);
