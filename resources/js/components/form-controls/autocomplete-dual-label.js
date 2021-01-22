// Must Implement and use
// for example on position field on staff register form

import React, { useEffect, useRef, useState } from "react";
import DualLabelFormControl from "./dual-label-form-control";
import { CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const Control = (
    {
        options = [],
        initialOptionIndex = null,
        loadingData = false,
        validation = {},
        register = null,
        isDependent = false,
        ...props
    },
    ref
) => {
    // console.log("AutoCompleteDualLabel", loadingData);
    // console.log("AutoCompleteDualLabel", options);
    // console.log("AutoCompleteDualLabel", initialOptionIndex);
    // console.log("AutoCompleteDualLabel", options[initialOptionIndex]);
    // console.log("AutoCompleteDualLabel", props);
    // console.log("AutoCompleteDualLabel validation:", validation);
    // console.log("AutoCompleteDualLabel register:", register);
    // console.log("AutoCompleteDualLabel ref:", ref);

    const [value, setValue] = useState(
        initialOptionIndex != null ? options[initialOptionIndex] : null
    );
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(loadingData);

    useEffect(() => {
        setLoading(loadingData);
        setValue(null);
    }, [loadingData]);

    useEffect(() => {
        if (props.disabled & isDependent) setValue(null);
    }, [props.disabled]);

    return (
        <DualLabelFormControl {...props}>
            <Autocomplete
                classes={{
                    inputRoot: "form-text-input dual-label-dropdown-root"
                }}
                fullWidth
                disabled={props.disabled || loading}
                loading={loading}
                options={options}
                getOptionLabel={option => option.label}
                renderInput={params => (
                    <TextField
                        name={"_" + props.name}
                        inputRef={ref}
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            value: value != null ? value.label : ""
                        }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: loading ? (
                                <CircularProgress
                                    classes={{ svg: "embeded-loading" }}
                                    size={15}
                                />
                            ) : null
                        }}
                    />
                )}
                value={value}
                onChange={(event, newValue) => {
                    // console.log("newValue", newValue);
                    setValue(newValue);
                    props.onChange && props.onChange(newValue);
                    // props.changeFocus();
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    // console.log("newInputValue", newInputValue);
                    setInputValue(newInputValue);
                }}
            />
            <input
                type="hidden"
                value={value != null ? value.value : ""}
                name={props.name}
                ref={ref}
            />
        </DualLabelFormControl>
    );
};

export default React.forwardRef(Control);
