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

export default function Form({ preset = "general", ...props }) {
    // props.item && console.log("DefineForm", props.item);
    // console.log("DefineForm", props);

    const [dropdowns, setDropdowns] = useState([]);
    const [ready, setReady] = useState(false);
    const [initialAlert, setInitialAlert] = useState();
    const [initialValues, setInitialValues] = useState({});

    const [holderType, setHolderType] = useState(null);
    const [holder, setHolder] = useState(false);
    const [dependentFields] = useState([]);
    const [loadingDependentData, setLoadingDependentData] = useState({});

    let presets = {
        general: {
            dataService: AddUnit,
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {
                holderType: {
                    disabled: loadingDependentData.holdertypes,
                    onChange: e => setHolderType(e)
                },
                holder: {
                    disabled: !holder,
                    loadingData: loadingDependentData.holdertypes
                }
            }
        },
        edit: preset == "edit" && {
            dataService: UpdateUnit,
            submitValue: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                // branch: {
                //     // readonly: true,
                //     initialOptionIndex: initialValues.branchIndex
                // },
                title: {
                    initialValue: {
                        local: props.item.title,
                        en: props.item.title_en
                    }
                },
                holder: {
                    disabled: !holder
                }
            }
        }
    };

    useEffect(() => {
        // props.item && console.log("DefineForm", props.item);

        const fields = ["holdertypes"];
        GetValidValues(
            fields,
            response => {
                // console.log("DefineForm Values", response.data);
                setDropdowns(response.data);
                if (preset == "edit") {
                }
                setReady(true);
            },
            error => {
                console.error("DepartmentForm ERROR", error);
                setReady(true);
            }
        );
    }, []);

    useEffect(() => {
        // console.log(holderType);
        if (holderType == null || holderType.value == "company") {
            setHolder(false);
        } else {
            setLoadingDependentData({
                ...loadingDependentData,
                holdertypes: true
            });
            GetValidValues(
                [holderType.value],
                response => {
                    console.log("UnitForm Values", response.data);
                    setDropdowns({
                        ...dropdowns,
                        holder: response.data[holderType.value]
                    });

                    setHolder(true);
                    setLoadingDependentData({
                        ...loadingDependentData,
                        holdertypes: false
                    });
                },
                error => {
                    console.error("UnitForm ERROR", error);
                    setHolder(false);
                    setLoadingDependentData({
                        ...loadingDependentData,
                        holdertypes: false
                    });
                }
            );
        }
    }, [holderType]);

    return (
        <SingleColumnFormBase
            dataService={presets[preset].dataService}
            submitValue={presets[preset].submitValue}
            ready={ready}
            item={props.item}
            showAlert={initialAlert}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("holderType")) && (
                <AutoCompleteSelect
                    name="holderType"
                    validation={{ required: true }}
                    label={t("labels.holderType")}
                    options={dropdowns.holdertypes}
                    {...presets[preset].inputProps["holderType"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("holder")) && (
                <AutoCompleteSelect
                    name="holder"
                    validation={{ required: holder }}
                    label={t("labels.holder")}
                    options={dropdowns.holder}
                    {...presets[preset].inputProps["holder"]}
                    isDependent={true}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("title")) && (
                <BilingualTextInput
                    name="title"
                    validation={{ required: true }}
                    {...presets[preset].inputProps["title"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
