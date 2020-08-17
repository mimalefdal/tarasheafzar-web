import React from "react";
import { useForm } from "react-hook-form";
import { DualLabelTextInput, ToggleSwitch, DualLabelToggleSwitch } from "..";
import { t } from "../../utils";
import { useState } from "react";
import apiClient from "../../services/api";

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
            });

        apiClient
            .post("/rights/add", data, { headers: headers })
            .then(response => {
                console.log(response);
                setBackendErrors(false);
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status == 422) {
                    setBackendErrors(error.response.data.errors);
                } else {
                    console.log(error.response);
                    setBackendErrors(false);
                }
            });

        // Axios.get("/sanctum/csrf-cookie").then(response => {
        //     console.log(response);

        //     apiClient
        //         .post("/rights/add", data, { headers: headers })
        //         .then(response => {
        //             console.log(response);
        //         })
        //         .catch(error => {
        //             console.log(error.response);
        //         });
        // });

        // axios
        //     .get("http://panels.localhost:8000/sanctum/csrf-cookie")
        //     .then(response => {
        //         console.log(response);
        //         axios
        //             .post(
        //                 "http://panels.localhost:8000/login",
        //                 { personnel_id: "1650", password: "abcd", state: 1 },
        //                 {
        //                     headers: { Accept: "application/json" },
        //                     withCredentials: true
        //                 }
        //             )
        //             .then(response => {
        //                 console.log(response);
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //     });

        // Axios.get("http://api.localhost:8000/sanctum/csrf-cookie").then(
        //     response => {
        //         console.log(response);
        //         if (response.status === 204) {
        //             Axios({
        //                 method: "post",
        //                 url: "http://api.localhost:8000/rights/add",
        //                 data: data,
        //                 headers: headers
        //                 // withCredentials: true
        //             })
        //                 .then(response => {
        //                     console.log("response:", response.data);
        //                     setBackendErrors(false);
        //                 })
        //                 .catch(error => {
        //                     if (error.response.status == 422) {
        //                         setBackendErrors(error.response.data.errors);
        //                     } else {
        //                         console.log(error.response);
        //                         setBackendErrors(false);
        //                     }
        //                 });
        //         }
        //     }
        // );
    };

    // console.log(watch("name")); // watch input value by passing the name of it

    return (
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
            {/* <input
                type="hidden"
                name="_token"
                ref={register}
                value={
                    document.head.querySelector('meta[name="csrf-token"]')
                        .content
                }
            ></input> */}
            <input
                className="btn btn-primary btn-submit-add"
                type="submit"
                value={t("labels.submit-add")}
            />
        </form>
    );
}