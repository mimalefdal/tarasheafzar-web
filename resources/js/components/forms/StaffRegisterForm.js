import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "../../utils";
import { useState } from "react";
import apiClient from "../../services/api";
import {
    DropDownSelect,
    DualLabelTextInput,
    FormLoadingData,
    FormTitle
} from "../form-controls";
import "../../styles/forms.css";
import { RightAddForm } from ".";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
    Backdrop,
    Button,
    CircularProgress,
    Collapse,
    LinearProgress,
    Snackbar
} from "@material-ui/core";
import {
    DeterminateProgress,
    FormAlert,
    LineProgress,
    RedirectBar
} from "../information";

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
    const [backendErrors, setBackendErrors] = useState(false);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [dropdowns, setDropdowns] = useState([]);
    const [showAlert, setShowAlert] = useState({
        show: props.showAlert ? props.showAlert.show : false,
        type: props.showAlert ? props.showAlert.type : "success",
        message: props.showAlert ? props.showAlert.message : ""
    });

    let token = sessionStorage.getItem("StaffAccessToken");
    let headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };

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

    const onSubmit = data => {
        // console.log(data);
        setLoading(true);
        setShowAlert({ show: false, type: showAlert.type });
        apiClient
            .post(presets[preset].url, data, { headers: headers })
            .then(response => {
                // console.log("Response", response);
                setLoading(false);
                setShowAlert({
                    show: true,
                    type: "success",
                    message: response.data.message
                });
                setBackendErrors(false);
                setRedirect(true);
            })
            .catch(error => {
                console.log("Error", error.response);
                setLoading(false);

                if (error.response.status == 422) {
                    setBackendErrors(error.response.data.errors);
                } else {
                    // console.log(error.response);
                    setBackendErrors(false);
                    setShowAlert({
                        show: true,
                        type: "error",
                        message: error.response.data.message
                    });

                    if (error.response.data.error == "ceo Already Defined") {
                        setRedirect(true);
                    }
                }
            });
    };

    // console.log(watch("name")); // watch input value by passing the name of it

    return (
        <div className="form-container general-shadow">
            {!ready ? (
                <FormLoadingData type="ball" />
            ) : (
                <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                    {loading && <LineProgress />}
                    {redirect && (
                        <RedirectBar
                            delay={5000}
                            target="/enterprise-management/initialize"
                        />
                    )}
                    <FormAlert
                        show={showAlert.show}
                        type={showAlert.type}
                        message={showAlert.message}
                    />

                    {(presets[preset].fields.includes("all") ||
                        presets[preset].fields.includes("gender")) && (
                        <DropDownSelect
                            name="gender"
                            ref={register({ required: true })}
                            label={t("labels.gender")}
                            errors={errors}
                            backendErrors={backendErrors}
                            items={dropdowns.gender}
                            {...presets[preset].inputProps["gender"]}
                            disabled={loading}
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
                            backendErrors={backendErrors}
                            {...presets[preset].inputProps["firstname"]}
                            disabled={loading}
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
                            backendErrors={backendErrors}
                            {...presets[preset].inputProps["lastname"]}
                            disabled={loading}
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
                            backendErrors={backendErrors}
                            {...presets[preset].inputProps["national_id"]}
                            disabled={loading}
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
                            backendErrors={backendErrors}
                            {...presets[preset].inputProps["idcert_no"]}
                            disabled={loading}
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
                            backendErrors={backendErrors}
                            items={dropdowns.position}
                            {...presets[preset].inputProps["position"]}
                            disabled={loading}
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
                            backendErrors={backendErrors}
                            {...presets[preset].inputProps["username"]}
                            disabled={loading}
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
                            backendErrors={backendErrors}
                            {...presets[preset].inputProps["email"]}
                            disabled={loading}
                        />
                    )}

                    {!redirect && (
                        <input
                            className="btn btn-primary btn-submit-add general-shadow"
                            type="submit"
                            value={t("labels.submit-add")}
                            disabled={loading}
                        />
                    )}
                </form>
            )}
        </div>
    );
}
