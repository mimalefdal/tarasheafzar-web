import React, { useState } from "react";
import { BilingualTextInput } from "../../components/form-controls";
import { SingleColumnFormBase } from "../../components/forms";
import { AddRole, UpdateRole } from "../../services";
import { currentLang, t } from "../../utils";

function Form({ preset = "add", ...props }) {
    const [initialAlert, setInitialAlert] = useState();
    const [initialValues, setInitialValues] = useState({});

    let presets = {
        general: {
            inputProps: {}
        },
        add: {
            dataService: AddRole,
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {}
        },
        edit: preset == "edit" && {
            dataService: UpdateRole,
            submitValue: t("labels.submit-update"),
            submitNew: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                title: {
                    initialValue: {
                        [currentLang()]: props.item.title,
                        en: props.item.title_en
                    }
                }
            }
        }
    };
    return (
        <SingleColumnFormBase
            dataService={presets[preset].dataService}
            submitValue={presets[preset].submitValue}
            submitNew={presets[preset].submitNew}
            item={props.item}
            showAlert={initialAlert}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("title")) && (
                <BilingualTextInput
                    name="title"
                    validation={{ required: true }}
                    title_official
                    label={t("labels.title")}
                    {...presets["general"].inputProps["title"]}
                    {...presets[preset].inputProps["title"]}
                />
            )}
        </SingleColumnFormBase>
    );
}

export default Form;
