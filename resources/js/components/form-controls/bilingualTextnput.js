import React, { useEffect, useState } from "react";
import { DualLabelTextInput } from ".";
import { currentLang, t } from "../../utils";
import { useForm } from "react-hook-form";
import { LocalGasStation } from "@material-ui/icons";

function Input({ name, errors, backendErrors, loading, ...props }, ref) {
    const [value, setValue] = useState({ local: "", en: "" });
    // console.log(props);

    useEffect(() => {
        if (props.initialValue) {
            // console.log("from bilingualInput", props.initialValue);
            setValue(props.initialValue);
        }
    }, []);

    return (
        <div>
            {currentLang() == "fa" && (
                <DualLabelTextInput
                    ref={ref}
                    name={name + "_fa"}
                    label={t("labels.title")}
                    labelComment={t("languages.fa")}
                    errors={errors}
                    backendErrors={backendErrors}
                    disabled={loading}
                    value={props.initialValue ? props.initialValue.local : null}
                    onChange={event => {
                        setValue({ ...value, local: event.target.value });
                    }}
                />
            )}

            <DualLabelTextInput
                ref={ref}
                name={name + "_en"}
                lang="en"
                label={t("labels.title")}
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
