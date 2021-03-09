// Must Implement and use
// for example on position field on staff register form

import React, { useEffect, useRef, useState } from "react";
import DualLabelFormControl from "./dual-label-form-control";
import { CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { t } from "../../utils";
import {
    findObjectInsideArray,
    getIndexOfMatchInsideArray
} from "../../utils/findObject";

const Control = (
    {
        options = [],
        // initialOptionIndex = null,
        initialValue = null,
        loadingData = false,
        validation = {},
        register = null,
        isDependent = false,
        ...props
    },
    ref
) => {
    // console.log("AutoCompleteDualLabel", loadingData);

    const [value, setValue] = useState(props.multiple ? [] : null);
    const [outputValue, setOutputValue] = useState("");
    const [displayValue, setDisplayValue] = useState("");
    // const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(loadingData);

    useEffect(() => {
        setLoading(loadingData);
        setValue(props.multiple ? [] : null);
    }, [loadingData]);

    useEffect(() => {
        if (props.disabled & isDependent) setValue(props.multiple ? [] : null);
    }, [props.disabled]);

    useEffect(() => {
        if (initialValue != null) {
            // console.log("Autocomplete[initialValue]", initialValue);
            if (props.multiple) {
                let _initialKeys = initialValue.split(",");
                let _initialOptions = _initialKeys.map(key =>
                    findObjectInsideArray(options, "value", key)
                );
                setValue(_initialOptions);
            } else {
                let _initialOption = findObjectInsideArray(
                    options,
                    "value",
                    initialValue
                );
                setValue(_initialOption);
            }
        }
    }, [initialValue]);

    useEffect(() => {
        // console.log("Autocomplete[Value]", value);
        if (!props.multiple) {
            setOutputValue(value != null ? value.value : "");
            setDisplayValue(value != null ? value.label : "");
        } else {
            let _values = value.map(_value => _value.value);
            setOutputValue(_values);
            let _labels = "";
            if (_values.length > 2) {
                setDisplayValue(
                    value.length > 0
                        ? value.length + " آیتم انتخاب شده است"
                        : ""
                );
            } else {
                value.forEach((element, index) => {
                    _labels =
                        _labels +
                        (_labels.length == 0 ? "" : ", ") +
                        element.label;
                });
                setDisplayValue(value.length > 0 ? _labels : "");
            }
        }
    }, [value]);

    useEffect(() => {
        // console.log("autocomplete outputValue", outputValue);
    }, [outputValue]);

    return (
        <DualLabelFormControl {...props}>
            <Autocomplete
                multiple={props.multiple}
                // freeSolo={props.multiple}
                disableCloseOnSelect={props.multiple}
                classes={{
                    inputRoot: "form-text-input dual-label-dropdown-root"
                }}
                fullWidth
                disabled={props.disabled || loading}
                loading={loading}
                options={options}
                getOptionLabel={option => option.label}
                noOptionsText={t("expressions.noOptionsToSelect")}
                renderInput={params => (
                    <TextField
                        name={"_" + props.name}
                        placeholder={
                            options.length == 0 && !props.disabled
                                ? t("expressions.noOptionsToSelect")
                                : ""
                        }
                        inputRef={ref}
                        onFocus={props.onFocus && props.onFocus}
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            value: displayValue
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
                    // console.log("newValue", event);
                    setValue(newValue);
                    props.onChange &&
                        props.onChange({
                            event: event,
                            target: props.dependentOptions,
                            value: newValue
                        });
                    // props.changeFocus();
                }}
                onInputChange={(event, newInputValue) => {
                    // console.log("newInputValue", newInputValue);
                    !props.multiple && setDisplayValue(newInputValue);
                }}
                onFocus={props.optionsAlert && props.optionsAlert}
                onBlur={props.onBlur && props.onBlur}
            />
            <input
                type="hidden"
                // value={
                //     value != null
                //         ? props.multiple
                //             ? JSON.stringify(value)
                //             : value.value
                //         : ""
                // }
                value={outputValue}
                name={props.name}
                ref={ref}
            />
        </DualLabelFormControl>
    );
};

export default React.forwardRef(Control);
