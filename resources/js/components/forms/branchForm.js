import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "../../utils";
import { useState } from "react";
import apiClient, { apiHeaders } from "../../services/api";
import {
    BilingualTextInput,
    DropDownSelect,
    DualLabelTextInput,
    FormLoadingData,
    FormTitle
} from "../form-controls";
import "../../styles/forms.css";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { LinearProgress } from "@material-ui/core";
import {
    DeterminateProgress,
    FormAlert,
    LineProgress,
    RedirectBar
} from "../information";

const presets = {
    general: {
        url: "/branchs/define",
        fields: ["all"],
        inputProps: {}
    }
};

export default function Form({ preset = "general", ...props }) {
    // console.log(props);

    const { register, handleSubmit, watch, errors, reset } = useForm();
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

    useEffect(() => {
        apiClient
            .get("/valuelist", { params: { fields: ["branchtypes"] } })
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
            .post(presets[preset].url, data, { headers: apiHeaders })
            .then(response => {
                console.log("Response", response);
                setLoading(false);
                setShowAlert({
                    show: true,
                    type: "success",
                    message: response.data.message
                });
                setBackendErrors(false);
                reset({ type: null });
                // setRedirect(true);
            })
            .catch(error => {
                console.log("Error", error.response.data);
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

                    if (error.response.data.error == "xxx") {
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
                            delay={2000}
                            target="/enterprise-management/initialize"
                        />
                    )}
                    <FormAlert
                        show={showAlert.show}
                        type={showAlert.type}
                        message={showAlert.message}
                    />

                    {(presets[preset].fields.includes("all") ||
                        presets[preset].fields.includes("type")) && (
                        <DropDownSelect
                            name="type"
                            ref={register({ required: true })}
                            label={t("labels.branchType")}
                            errors={errors}
                            backendErrors={backendErrors}
                            items={dropdowns.branchtypes}
                            {...presets[preset].inputProps["type"]}
                            disabled={loading}
                        />
                    )}

                    {(presets[preset].fields.includes("all") ||
                        presets[preset].fields.includes("title")) && (
                        <BilingualTextInput
                            name="title"
                            ref={register({ required: true })}
                            errors={errors}
                            backendErrors={backendErrors}
                            loading={loading}
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
