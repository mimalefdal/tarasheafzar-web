import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    findObject,
    getMatchIndexOf,
    getObjectFromArray,
    t
} from "../../utils";
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

    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [dropdowns, setDropdowns] = useState([]);
    const [ready, setReady] = useState(false);
    const [initialAlert, setInitialAlert] = useState();
    const [initialValues, setInitialValues] = useState({});

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
                    initialOptionIndex: initialValues.branchIndex
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
        // props.item && console.log("DefineForm", props.item);

        const fields = ["branch"];
        GetValidValues(
            fields,
            response => {
                // console.log("DefineForm Values", response.data);
                setDropdowns(response.data);
                if (preset == "edit") {
                    if (props.item && props.item.branch) {
                        //means Item has a branch
                        if (props.item.branch.deleted == true) {
                            // item branch was deleted
                            // console.log("deleted branch");
                            setInitialAlert({
                                show: true,
                                type: "warning",
                                message: "شاخه پاک شده است"
                            });
                        } else {
                            // set branch as selected
                            let _initialIndex = getMatchIndexOf(
                                response.data.branch,
                                "value",
                                props.item.branch.slug
                            );
                            setInitialValues({
                                ...initialValues,
                                branchIndex: _initialIndex
                            });
                        }
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
