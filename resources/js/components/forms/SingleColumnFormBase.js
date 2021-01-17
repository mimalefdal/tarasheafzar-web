import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { FormAlert, LineProgress, Loading, RedirectBar } from "../feedback";
import { t } from "../../utils";
import { ApiClient } from "../../services";
import StaffContext from "../../context/staffContext";
import { useHistory } from "react-router-dom";

FormBase.propTypes = {
    submitUrl: PropTypes.string,
    ready: PropTypes.bool,
    handleSubmit: PropTypes.func,
    showAlert: PropTypes.object
};

function FormBase({
    handleSubmit,
    dataService,
    redirectDelay = 5000,
    redirectTarget = "/home",
    submitValue,
    ready,
    ...props
}) {
    // console.log("SingleColumnFormBase", props);

    const [backendErrors, setBackendErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showAlert, setShowAlert] = useState({
        show: props.showAlert ? props.showAlert.show : false,
        type: props.showAlert ? props.showAlert.type : "success",
        message: props.showAlert ? props.showAlert.message : ""
    });
    const token = useContext(StaffContext).token;
    let history = useHistory();

    useEffect(() => {
        setShowAlert({
            show: props.showAlert ? props.showAlert.show : false,
            type: props.showAlert ? props.showAlert.type : "success",
            message: props.showAlert ? props.showAlert.message : ""
        });
    }, [props.showAlert]);

    const onSubmit = data => {
        console.log("submit", data);
        setLoading(true);
        setShowAlert({ show: false, type: showAlert.type });

        // add item to request data for possible uses in backend controller
        if (props.item) data["item"] = props.item;
        dataService(data, token, successResponse, errorResponse);
    };

    function successResponse(response) {
        console.log(response.data);
        setLoading(false);
        setShowAlert({
            show: true,
            type: "success",
            message: response.data.message
        });
        setBackendErrors(false);
        if (!props.item) {
            // means form is not in edit mode
            props.reset();
        }
        response.data.redirect && setRedirect(true);
    }

    function errorResponse(error) {
        console.log("SingleColumnFormBase", error);
        setLoading(false);

        if (error.status == 422) {
            setBackendErrors(error.data.errors);
        } else {
            // console.log(error.response);
            setBackendErrors(false);
            setShowAlert({
                show: true,
                type: "error",
                message: error.data.message
            });
        }
        error.data.redirect && setRedirect(true);
        // error.data.redirect && history.push(redirectTarget);
    }

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
            {!ready ? (
                <Loading type="ball" />
            ) : (
                <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                    {loading && <LineProgress />}
                    {redirect && (
                        <RedirectBar
                            delay={redirectDelay}
                            target={redirectTarget}
                            // type="asc"
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
                            value={submitValue}
                            disabled={loading}
                        />
                    )}
                </form>
            )}
        </div>
    );
}

export default FormBase;
