import React, { useEffect, useState } from "react";
import { DualLabelTextInput } from ".";
import { currentLang, t } from "../../utils";
import { useForm } from "react-hook-form";
import { LocalGasStation } from "@material-ui/icons";

function Input({ name, errors, backendErrors, loading, ...props }, ref) {
    const [value, setValue] = useState({ local: "", en: "" });
    // console.log(props);

    useEffect(() => {
        if (props.itemValue) {
            // console.log("from bilingualInput", props.itemValue);
            setValue(props.itemValue);
        }
    }, []);

    return (
        <div>
            <input
                type="hidden"
                value={JSON.stringify(value)}
                name={name}
                ref={ref}
            />
            {currentLang() == "fa" && (
                <DualLabelTextInput
                    ref={ref}
                    name={name + "_fa"}
                    label={t("labels.title")}
                    labelComment={t("languages.fa")}
                    errors={errors}
                    backendErrors={backendErrors}
                    disabled={loading}
                    value={props.itemValue ? props.itemValue.local : null}
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
                value={props.itemValue ? props.itemValue.en : null}
                onChange={event =>
                    setValue({ ...value, en: event.target.value })
                }
            />
        </div>
    );
}

export default React.forwardRef(Input);
