import React, { useEffect } from "react";
import { currentLang, getObjectFromArray, t } from "../../utils";
import { useState } from "react";
import {
    AutoCompleteSelect,
    BilingualTextInput,
    DropDownSelect
} from "../../components/form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from "../../components/forms";
import {
    AddBranch,
    ApiClient,
    GetValidValues,
    UpdateBranch
} from "../../services";

export default function Form({ preset = "add", ...props }) {
    // props.item && console.log("defineFormBranches->item:", props.item);
    const [initialAlert, setInitialAlert] = useState();

    let presets = {
        general: {
            inputProps: {}
        },
        add: {
            dataService: AddBranch,
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {}
        },
        edit: preset == "edit" && {
            dataService: UpdateBranch,
            submitValue: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                type: {
                    // readonly: true,
                    initialValue: props.item.type_slug
                },
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
            item={props.item}
            showAlert={initialAlert}
            listedFields={["branchtypes"]}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("type")) && (
                <AutoCompleteSelect
                    name="type"
                    label={t("labels.branchType")}
                    validation={{ required: true }}
                    options="branchtypes"
                    {...presets["general"].inputProps["type"]}
                    {...presets[preset].inputProps["type"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("title")) && (
                <BilingualTextInput
                    name="title"
                    validation={{ required: true }}
                    {...presets["general"].inputProps["title"]}
                    {...presets[preset].inputProps["title"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
