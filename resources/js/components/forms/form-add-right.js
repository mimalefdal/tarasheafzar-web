import React from "react";
import { useForm } from "react-hook-form";
import { DualLabelTextInput, ToggleSwitch, DualLabelToggleSwitch } from "..";
import { t } from "../../utils";
import { useState } from "react";
import apiClient from "../../services/api";
import { FormTitle } from "../form-controls";

export default function App() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [backendErrors, setBackendErrors] = useState(false);

    const onSubmit = data => {
        let token = sessionStorage.getItem("StaffAccessToken");

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + token
        };

        apiClient
            .get("/user", {
                headers: headers
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });

        apiClient
            .post("/rights/add", data, { headers: headers })
            .then(response => {
                // console.log(response);
                setBackendErrors(false);
            })
            .catch(error => {
                // console.log(error.response);
                if (error.response.status == 422) {
                    setBackendErrors(error.response.data.errors);
                } else {
                    // console.log(error.response);
                    setBackendErrors(false);
                }
            });
    };

    // console.log(watch("name")); // watch input value by passing the name of it

    return (
        <div className="container">
            {/* <FormTitle title={t("custum-titles.defineRight")} /> */}
            <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                <DualLabelTextInput
                    name="slug"
                    ref={register({ required: true })}
                    placeholder="slug"
                    label={t("labels.slug")}
                    labelComment="ex: slug-for-right"
                    errors={errors}
                    backendErrors={backendErrors}
                />

                <DualLabelTextInput
                    name="title"
                    placeholder="title"
                    ref={register({ required: true })}
                    label={t("labels.title_en")}
                    labelComment=""
                    errors={errors}
                    backendErrors={backendErrors}
                />
                <DualLabelTextInput
                    name="title_fa"
                    placeholder="title_fa"
                    ref={register({ required: true })}
                    label={t("labels.title_fa")}
                    labelComment=""
                    errors={errors}
                    backendErrors={backendErrors}
                />

                <DualLabelToggleSwitch
                    name="activation"
                    ref={register}
                    label={t("labels.activation")}
                    isOn={false}
                />

                <input
                    className="btn btn-primary btn-submit-add"
                    type="submit"
                    value={t("labels.submit-add")}
                />
            </form>
        </div>
    );
}
