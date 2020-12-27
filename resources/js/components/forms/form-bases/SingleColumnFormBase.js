import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormLoadingData } from "../../form-controls";
import apiClient, { apiHeaders } from "../../../services/api";
import { useForm } from "react-hook-form";
import { FormAlert, LineProgress, RedirectBar } from "../../information";
import { t } from "../../../utils";

FormBase.propTypes = {
    submitUrl: PropTypes.string,
    ready: PropTypes.bool,
    handleSubmit: PropTypes.func,
    showAlert: PropTypes.object
};

function FormBase({
    handleSubmit,
    redirectDelay = 5000,
    redirectTarget = "/home",
    ...props
}) {
    // console.log("Base", props);

    const [backendErrors, setBackendErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showAlert, setShowAlert] = useState({
        show: props.showAlert ? props.showAlert.show : false,
        type: props.showAlert ? props.showAlert.type : "success",
        message: props.showAlert ? props.showAlert.message : ""
    });

    const onSubmit = data => {
        // console.log("submit", data);
        setLoading(true);
        setShowAlert({ show: false, type: showAlert.type });
        apiClient
            .post(props.submitUrl, data, { headers: apiHeaders })
            .then(response => {
                console.log("Response", response);
                setLoading(false);
                setShowAlert({
                    show: true,
                    type: "success",
                    message: response.data.message
                });
                setBackendErrors(false);
                props.reset();
                response.data.redirect && setRedirect(true);
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
                }
                error.response.data.redirect && setRedirect(true);
            });
    };
    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                backendErrors: backendErrors,
                loading: loading
            });
        }
        return child;
    });

    return (
        <div className="form-container general-shadow">
            {!props.ready ? (
                <FormLoadingData type="ball" />
            ) : (
                <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                    {loading && <LineProgress />}
                    {redirect && (
                        <RedirectBar
                            delay={redirectDelay}
                            target={redirectTarget}
                        />
                    )}
                    <FormAlert
                        show={showAlert.show}
                        type={showAlert.type}
                        message={showAlert.message}
                    />

                    {childrenWithProps}

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

export default FormBase;
