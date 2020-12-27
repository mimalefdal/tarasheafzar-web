import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "../../utils";
import { useState } from "react";
import apiClient, { apiHeaders } from "../../services/api";
import { DropDownSelect, DualLabelTextInput } from "../form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from ".";

const presets = {
    general: {
        url: "/staff/add",
        fields: ["all"],
        inputProps: {}
    },
    ceo: {
        url: "/initialize/defineceo",
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
                defaultItem: { value: "ceo", label: "مدیرعامل" }
            }
        }
    }
};

export default function Form({ preset = "general", ...props }) {
    // console.log(props);

    const { register, handleSubmit, watch, errors } = useForm();
    const [ready, setReady] = useState(false);
    const [dropdowns, setDropdowns] = useState([]);

    useEffect(() => {
        apiClient
            .get("/valuelist", { params: { fields: ["gender", "position"] } })
            .then(response => {
                // console.log(response.data);
                setDropdowns(response.data);
                setReady(true);
            })
            .catch(error => {
                console.log(error.response);
                setReady(true);
            });
    }, []);

    return (
        <SingleColumnFormBase
            submitUrl={presets[preset].url}
            ready={ready}
            handleSubmit={handleSubmit}
            showAlert={props.showAlert}
            redirectDelay={1000}
            redirectTarget="/enterprise-management/initialize/"
        >
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
