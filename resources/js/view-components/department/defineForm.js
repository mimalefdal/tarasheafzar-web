import React, { useEffect } from "react";
import {
    findObject,
    getMatchIndexOf,
    getObjectFromArray,
    t
} from "../../utils";
import { useState } from "react";
import {
    AutoCompleteSelect,
    BilingualTextInput
} from "../../components/form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from "../../components/forms";
import {
    AddDepartment,
    GetValidValues,
    UpdateDepartment
} from "../../services";

export default function Form({ preset = "add", ...props }) {
    props.item && console.log("DefineForm", props.item);
    // console.log("DefineForm", props);

    const [initialAlert, setInitialAlert] = useState();

    useEffect(() => {
        if (preset == "edit") {
            if (props.item && props.item.holder_id) {
                //means Item has a branch
                if (props.item.holder.deleted) {
                    // item branch was deleted
                    console.log("deleted branch");
                    setInitialAlert({
                        show: true,
                        type: "warning",
                        message: props.item.deleted_holder_warning
                    });
                }
            }
        }
    }, []);

    let presets = {
        general: {
            inputProps: {}
        },
        add: {
            dataService: AddDepartment,
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {}
        },
        edit: preset == "edit" && {
            dataService: UpdateDepartment,
            submitValue: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                branch: {
                    // readonly: true,
                    initialValue:
                        props.item.holder_id && !props.item.holder.deleted
                            ? props.item.holder.slug
                            : null
                },
                title: {
                    initialValue: {
                        local: props.item.title,
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
            listedFields={["branch"]}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("branch")) && (
                <AutoCompleteSelect
                    name="branch"
                    label={t("labels.branch")}
                    options="branch"
                    {...presets["general"].inputProps["branch"]}
                    {...presets[preset].inputProps["branch"]}
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
