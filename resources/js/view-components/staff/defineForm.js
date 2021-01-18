import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getObjectFromArray, t } from "../../utils";
import { useState } from "react";
import {
    DropDownSelect,
    DualLabelTextInput
} from "../../components/form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from "../../components/forms";
import { AddStaff, GetValidValues, InitializeCEO } from "../../services";

export default function Form({ preset = "general", ...props }) {
    // console.log("DefineFormStaff->preset:", preset);

    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [ready, setReady] = useState(false);
    const [dropdowns, setDropdowns] = useState([]);
    const [initialValues, setInitialValues] = useState({ position: "" });

    let presets = {
        general: {
            dataService: AddStaff,
            submitValue: t("labels.submit-add"),

            fields: ["all"],
            inputProps: {}
        },
        ceo: {
            dataService: InitializeCEO,
            submitValue: t("labels.submit-define-ceo"),
            fields: [
                "gender",
                "firstname",
                "lastname",
                "national_id",
                "idcert_no",
                "position",
                "email"
            ],
            inputProps: {
                position: {
                    readonly: true,
                    initialValue: initialValues.position
                    // TODO: this item must get from positions api and set here
                }
            }
        }
    };

    useEffect(() => {
        const fields = ["gender", "position"];
        GetValidValues(
            fields,
            response => {
                // console.log(
                //     "defineFormStaff->useEffect->getValues->Response:",
                //     response.data.position
                // );
                setDropdowns(response.data);
                switch (preset) {
                    case "ceo":
                        let _initialPosition = getObjectFromArray(
                            response.data.position,
                            "value",
                            "ceo"
                        );
                        setInitialValues({
                            ...initialValues,
                            position: _initialPosition
                        });
                        break;

                    default:
                        break;
                }

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
            ready={ready}
            handleSubmit={handleSubmit}
            reset={reset}
            showAlert={props.showAlert}
            // redirectDelay={2000}
            redirectTarget="/enterprise-management/initialize"
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("position")) && (
                <DropDownSelect
                    name="position"
                    ref={register({ required: true })}
                    label={t("labels.position")}
                    labelComment=""
                    errors={errors}
                    items={dropdowns.position}
                    {...presets[preset].inputProps["position"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("gender")) && (
                <DropDownSelect
                    name="gender"
                    ref={register({ required: true })}
                    label={t("labels.gender")}
                    errors={errors}
                    items={dropdowns.gender}
                    {...presets[preset].inputProps["gender"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("firstname")) && (
                <DualLabelTextInput
                    name="firstname"
                    ref={register({ required: true })}
                    label={t("labels.name")}
                    labelComment=""
                    errors={errors}
                    {...presets[preset].inputProps["firstname"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("lastname")) && (
                <DualLabelTextInput
                    name="lastname"
                    ref={register({ required: true })}
                    label={t("labels.lastname")}
                    labelComment=""
                    errors={errors}
                    {...presets[preset].inputProps["lastname"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("national_id")) && (
                <DualLabelTextInput
                    name="national_id"
                    ref={register({ required: true })}
                    label={t("labels.national_id")}
                    labelComment=""
                    errors={errors}
                    {...presets[preset].inputProps["national_id"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("idcert_no")) && (
                <DualLabelTextInput
                    name="idcert_no"
                    ref={register({ required: true })}
                    label={t("labels.idcert_no")}
                    labelComment=""
                    errors={errors}
                    {...presets[preset].inputProps["idcert_no"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("username")) && (
                <DualLabelTextInput
                    name="username"
                    ref={register({ required: true })}
                    label={t("labels.username")}
                    labelComment=""
                    errors={errors}
                    {...presets[preset].inputProps["username"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("email")) && (
                <DualLabelTextInput
                    name="email"
                    ref={register({})}
                    label={t("labels.email")}
                    labelComment={t("comments.none-company")}
                    errors={errors}
                    {...presets[preset].inputProps["email"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
