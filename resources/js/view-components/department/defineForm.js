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
    AddDepartment,
    GetValidValues,
    UpdateDepartment
} from "../../services";

export default function Form({ preset = "general", ...props }) {
    // props.item && console.log("DefineForm", props.item);
    // console.log("DefineForm", props);

    function findValueObject(valueObject) {
        return valueObject.value == props.item.branch.slug;
    }

    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [dropdowns, setDropdowns] = useState([]);
    const [ready, setReady] = useState(false);
    const [initialAlert, setInitialAlert] = useState();
    const [initialOptionIndex, setInitialOptionIndex] = useState(null);

    useEffect(() => {
        // props.item && console.log("DefineForm", props.item);

        const fields = ["branch"];
        GetValidValues(
            fields,
            response => {
                // console.log("DefineForm Values", response.data);
                setDropdowns(response.data);
                if (preset == "edit") {
                    if (props.item && props.item.branch.deleted == true) {
                        console.log("deleted branch");
                        setInitialAlert({
                            show: true,
                            type: "warning",
                            message: "شاخه پاک شده است"
                        });
                    } else {
                        const initialOption_ValueObject = response.data.branch.find(
                            findValueObject
                        );
                        const initialOption_Index = response.data.branch.indexOf(
                            initialOption_ValueObject
                        );
                        setInitialOptionIndex(initialOption_Index);
                    }
                }
                setReady(true);
            },
            error => {
                console.error("DepartmentForm ERROR", error);
                setReady(true);
            }
        );
    }, []);

    let presets = {
        general: {
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
                    initialOptionIndex: initialOptionIndex
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
            handleSubmit={handleSubmit}
            ready={ready}
            reset={reset}
            item={props.item}
            showAlert={initialAlert}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("branch")) && (
                <AutoCompleteSelect
                    name="branch"
                    ref={register({})}
                    label={t("labels.branch")}
                    errors={errors}
                    options={dropdowns.branch}
                    {...presets[preset].inputProps["branch"]}
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
