import React, { useEffect } from "react";
import { getObjectFromArray, t } from "../../utils";
import { useState } from "react";
import {
    AutoCompleteSelect,
    DropDownSelect,
    DualLabelTextInput
} from "../../components/form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from "../../components/forms";
import { AddStaff, GetValidValues, InitializeCEO } from "../../services";

export default function Form({ preset = "add", ...props }) {
    console.log("DefineFormStaff->preset:", preset);

    const [initialAlert, setInitialAlert] = useState();
    const [initialValues, setInitialValues] = useState({});

    let presets = {
        general: {
            inputProps: {}
        },
        add: {
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
                    disabled: true,
                    initialValue: "executive-chief-officer"
                }
            }
        }
    };

    return (
        <SingleColumnFormBase
            dataService={presets[preset].dataService}
            submitValue={presets[preset].submitValue}
            item={props.item}
            showAlert={props.showAlert}
            listedFields={["position", "gender"]}
            // redirectDelay={2000}
            redirectTarget="/enterprise/initialize"
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("position")) && (
                <AutoCompleteSelect
                    name="position"
                    validation={{ required: true }}
                    label={t("labels.position")}
                    labelComment=""
                    options="position"
                    {...presets["general"].inputProps["position"]}
                    {...presets[preset].inputProps["position"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("gender")) && (
                <AutoCompleteSelect
                    name="gender"
                    validation={{ required: true }}
                    label={t("labels.gender")}
                    options="gender"
                    {...presets["general"].inputProps["gender"]}
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
                    {...presets["general"].inputProps["firstname"]}
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
                    {...presets["general"].inputProps["lastname"]}
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
                    {...presets["general"].inputProps["national_id"]}
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
                    {...presets["general"].inputProps["idcert_no"]}
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
                    {...presets["general"].inputProps["username"]}
                    {...presets[preset].inputProps["username"]}
                />
            )}
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("email")) && (
                <DualLabelTextInput
                    name="email"
                    label={t("labels.email")}
                    labelComment={t("comments.none-company")}
                    {...presets["general"].inputProps["email"]}
                    {...presets[preset].inputProps["email"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
