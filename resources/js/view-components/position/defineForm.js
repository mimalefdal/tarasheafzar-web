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
    DualLabelNumberInput,
    DualLabelTextInput
} from "../../components/form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from "../../components/forms";
import { AddPosition, GetValidValues, UpdatePosition } from "../../services";

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
            dataService: AddPosition,
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {}
        },
        edit: preset == "edit" && {
            dataService: UpdatePosition,
            submitValue: t("labels.submit-update"),
            submitNew: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                holderType: {
                    // disabled: true,
                    initialValue: props.item.holder_type
                },
                holder: {
                    initialValue:
                        props.item.holder_id && !props.item.holder.deleted
                            ? props.item.holder.slug
                            : null
                },
                joblevel: {
                    initialValue: props.item.joblevel
                },
                title: {
                    initialValue: {
                        [currentLang()]: props.item.title,
                        en: props.item.title_en
                    }
                },
                displayTitle: {
                    initialValue: {
                        [currentLang()]: props.item.display_title,
                        en: props.item.display_title_en
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
            listedFields={["holdertypes.position"]}
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
                    dependentOptions={{
                        holders: "",
                        joblevels: "joblevel"
                    }}
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
                    optionAlertField="holderType"
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("joblevel")) && (
                <AutoCompleteSelect
                    name="joblevel"
                    validation={{ required: true }}
                    label={t("labels.joblevel")}
                    options="joblevels"
                    {...presets["general"].inputProps["joblevel"]}
                    {...presets[preset].inputProps["joblevel"]}
                    isDependent={true}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("title")) && (
                <BilingualTextInput
                    name="title"
                    validation={{ required: true }}
                    title_official
                    label={t("labels.title_official")}
                    {...presets["general"].inputProps["title"]}
                    {...presets[preset].inputProps["title"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("displayTitle")) && (
                <BilingualTextInput
                    name="displayTitle"
                    validation={{}}
                    label={t("labels.title_display")}
                    {...presets["general"].inputProps["displayTitle"]}
                    {...presets[preset].inputProps["displayTitle"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("recruit_capacity")) && (
                <DualLabelNumberInput
                    name="recruit_capacity"
                    validation={{ required: true }}
                    label={t("labels.recruit_capacity")}
                    // numberProps={{ min: 1 }}
                    value={1}
                    {...presets["general"].inputProps["recruit_capacity"]}
                    {...presets[preset].inputProps["recruit_capacity"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
