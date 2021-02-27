import React, { useEffect, useState } from "react";
import { DualLabelTextInput } from ".";
import { currentLang, t } from "../../utils";
import { useForm } from "react-hook-form";
import { LocalGasStation } from "@material-ui/icons";

function Input({ name, errors, backendErrors, loading, ...props }, ref) {
    const [value, setValue] = useState({ en: "" });
    // console.log("biLingualTextInput Props", props);

    useEffect(() => {
        if (props.initialValue) {
            // console.log("from bilingualInput", props.initialValue);
            setValue(props.initialValue);
        }
    }, []);

    useEffect(() => {
        // console.log(value);
    }, [value]);

    return (
        <div>
            {currentLang() == "fa" && (
                <DualLabelTextInput
                    {...props}
                    ref={ref}
                    name={name + "_fa"}
                    label={props.label ? props.label : t("labels.title")}
                    labelComment={t("languages.fa")}
                    errors={errors}
                    backendErrors={backendErrors}
                    disabled={loading}
                    value={props.initialValue ? props.initialValue.local : null}
                    onChange={event => {
                        setValue({ ...value, fa: event.target.value });
                    }}
                />
            )}

            <DualLabelTextInput
                {...props}
                ref={ref}
                name={name + "_en"}
                lang="en"
                label={props.label ? props.label : t("labels.title")}
                labelComment="English"
                errors={errors}
                backendErrors={backendErrors}
                disabled={loading}
                value={props.initialValue ? props.initialValue.en : null}
                onChange={event =>
                    setValue({ ...value, en: event.target.value })
                }
            />
            <input
                type="hidden"
                value={JSON.stringify(value)}
                name={name}
                ref={ref}
            />
        </div>
    );
}

export default React.forwardRef(Input);
