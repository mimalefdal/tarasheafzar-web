import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "../../utils";
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
    // props.item && console.log("form", props);

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
                    initialValue: props.item.type_object
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

    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [dropdowns, setDropdowns] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fields = ["branchtypes"];
        GetValidValues(
            fields,
            response => {
                console.log(response.data);
                setDropdowns(response.data);
                setReady(true);
            },
            error => {
                console.log(error);
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
