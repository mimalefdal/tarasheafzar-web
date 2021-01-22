import React, { useEffect } from "react";
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

    const [ready, setReady] = useState(false);
    const [dropdowns, setDropdowns] = useState([]);
    const [initialValues, setInitialValues] = useState({});

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
            showAlert={props.showAlert}
            // redirectDelay={2000}
            redirectTarget="/enterprise-management/initialize"
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("position")) && (
                <DropDownSelect
                    name="position"
                    validation={{ required: true }}
                    label={t("labels.position")}
                    labelComment=""
                    items={dropdowns.position}
                    {...presets[preset].inputProps["position"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("gender")) && (
                <DropDownSelect
                    name="gender"
                    validation={{ required: true }}
                    label={t("labels.gender")}
                    items={dropdowns.gender}
                    {...presets[preset].inputProps["gender"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("firstname")) && (
                <DualLabelTextInput
                    name="firstname"
                    validation={{ required: true }}
                    label={t("labels.name")}
                    labelComment=""
                    {...presets[preset].inputProps["firstname"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("lastname")) && (
                <DualLabelTextInput
                    name="lastname"
                    validation={{ required: true }}
                    label={t("labels.lastname")}
                    labelComment=""
                    {...presets[preset].inputProps["lastname"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("national_id")) && (
                <DualLabelTextInput
                    name="national_id"
                    validation={{ required: true }}
                    label={t("labels.national_id")}
                    labelComment=""
                    {...presets[preset].inputProps["national_id"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("idcert_no")) && (
                <DualLabelTextInput
                    name="idcert_no"
                    validation={{ required: true }}
                    label={t("labels.idcert_no")}
                    labelComment=""
                    {...presets[preset].inputProps["idcert_no"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("username")) && (
                <DualLabelTextInput
                    name="username"
                    validation={{ required: true }}
                    label={t("labels.username")}
                    labelComment=""
                    {...presets[preset].inputProps["username"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("email")) && (
                <DualLabelTextInput
                    name="email"
                    label={t("labels.email")}
                    labelComment={t("comments.none-company")}
                    {...presets[preset].inputProps["email"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
