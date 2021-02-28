import React, { useEffect, useRef } from "react";
import {
    currentLang,
    findObject,
    getMatchIndexOf,
    getObjectFromArray,
    t
} from "../../utils";
import { useState } from "react";
import {
    AutoCompleteSelect,
    BilingualTextInput,
    DualLabelNumberInput
} from "../../components/form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from "../../components/forms";
import { AddJoblevel, GetValidValues, UpdateJoblevel } from "../../services";

export default function Form({ preset = "add", ...props }) {
    // props.item && console.log("Define   Form", props.item);
    // console.log("DefineForm", props);

    const [initialAlert, setInitialAlert] = useState();
    const [initialValues, setInitialValues] = useState({});

    let presets = {
        general: {
            inputProps: {}
        },
        add: {
            dataService: AddJoblevel,
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {}
        },
        edit: preset == "edit" && {
            dataService: UpdateJoblevel,
            submitValue: t("labels.submit-update"),
            submitNew: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                scope: {
                    // disabled: true,
                    initialValue: props.item.scope
                },
                title: {
                    initialValue: {
                        [currentLang()]: props.item.title,
                        en: props.item.title_en
                    }
                },
                priority: {
                    initialValue: props.item.priority
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
            listedFields={["blocks"]}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("title")) && (
                <BilingualTextInput
                    name="title"
                    validation={{ required: true }}
                    label={t("labels.title")}
                    {...presets["general"].inputProps["title"]}
                    {...presets[preset].inputProps["title"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("scope")) && (
                <AutoCompleteSelect
                    multiple
                    name="scope"
                    // validation={{ required: true }}
                    label={t("labels.scopes")}
                    labelComment="بلوک‌های سازمانی"
                    options="blocks"
                    {...presets["general"].inputProps["scope"]}
                    {...presets[preset].inputProps["scope"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("priority")) && (
                <DualLabelNumberInput
                    name="priority"
                    validation={{ required: true }}
                    label={t("labels.priority")}
                    // numberProps={{ min: 1 }}
                    value={1}
                    {...presets["general"].inputProps["priority"]}
                    {...presets[preset].inputProps["priority"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
