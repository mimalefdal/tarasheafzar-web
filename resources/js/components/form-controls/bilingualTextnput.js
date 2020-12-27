import React, { useState } from "react";
import { DualLabelTextInput } from ".";
import { currentLang, t } from "../../utils";
import { useForm } from "react-hook-form";

function Input({ name, errors, backendErrors, loading, ...props }, ref) {
    const [value, setValue] = useState({ fa: "", en: "" });

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
                    labelComment="فارسی"
                    errors={errors}
                    backendErrors={backendErrors}
                    disabled={loading}
                    onChange={event => {
                        setValue({ ...value, fa: event.target.value });
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
                onChange={event =>
                    setValue({ ...value, en: event.target.value })
                }
            />
        </div>
    );
}

export default React.forwardRef(Input);
