import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getObjectFromArray, t } from "../../utils";
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

export default function Form({ preset = "general", ...props }) {
    // props.item && console.log("defineFormBranches->item:", props.item);

    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [dropdowns, setDropdowns] = useState([]);
    const [ready, setReady] = useState(false);
    const [initialAlert, setInitialAlert] = useState();
    const [initialValues, setInitialValues] = useState({});

    let presets = {
        general: {
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
                    // initialValue: props.item.type_object
                    initialValue: initialValues.type
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

    useEffect(() => {
        const fields = ["branchtypes"];
        GetValidValues(
            fields,
            response => {
                // console.log(
                //     "defineFormBranches->useEffect->getValues->Response:",
                //     response.data
                // );
                setDropdowns(response.data);
                if (preset == "edit") {
                    let _initialType = getObjectFromArray(
                        response.data.branchtypes,
                        "value",
                        props.item.type_slug
                    );
                    setInitialValues({ ...initialValues, type: _initialType });
                }
                setReady(true);
            },
            error => {
                console.error(
                    "defineFormBranches->useEffect->getValues->ERROR:",
                    error
                );
                setReady(true);
            }
        );
    }, []);

    return (
        <SingleColumnFormBase
            dataService={presets[preset].dataService}
            submitValue={presets[preset].submitValue}
            handleSubmit={handleSubmit}
            ready={ready}
            reset={reset}
            item={props.item}
            showAlert={initialAlert}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("type")) && (
                <DropDownSelect
                    name="type"
                    ref={register({ required: true })}
                    label={t("labels.branchType")}
                    errors={errors}
                    items={dropdowns.branchtypes}
                    {...presets[preset].inputProps["type"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("title")) && (
                <BilingualTextInput
                    name="title"
                    ref={register({ required: true })}
                    errors={errors}
                    {...presets[preset].inputProps["title"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
