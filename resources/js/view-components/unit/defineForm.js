import React, { useEffect, useRef } from "react";
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
import { AddUnit, GetValidValues, UpdateUnit } from "../../services";

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
            dataService: AddUnit,
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {}
        },
        edit: preset == "edit" && {
            dataService: UpdateUnit,
            submitValue: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                holderType: {
                    // disabled: true,
                    initialValue:
                        props.item.holder_id && !props.item.holder.deleted
                            ? props.item.holder_type
                            : null
                },
                holder: {
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
            listedFields={["holdertypes"]}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("holderType")) && (
                <AutoCompleteSelect
                    name="holderType"
                    validation={{ required: true }}
                    label={t("labels.holderType")}
                    options="holdertypes"
                    {...presets["general"].inputProps["holderType"]}
                    {...presets[preset].inputProps["holderType"]}
                    dependentOptions="holders"
                    dependentFieldName="holder"
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("holder")) && (
                <AutoCompleteSelect
                    name="holder"
                    validation={{ required: true }}
                    label={t("labels.holder")}
                    options="holders"
                    {...presets["general"].inputProps["holder"]}
                    {...presets[preset].inputProps["holder"]}
                    isDependent={true}
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
