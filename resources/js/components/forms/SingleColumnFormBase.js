import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { FormAlert, LineProgress, Loading, RedirectBar } from "../feedback";
import { getNextFocusIndex, t } from "../../utils";
import { ApiClient, GetValidValues } from "../../services";
import StaffContext from "../../context/staffContext";
import { useHistory } from "react-router-dom";
import { getIndexOfMatchInsideArray } from "../../utils/findObject";

// FormBase.propTypes = {
//     submitUrl: PropTypes.string,
//     ready: PropTypes.bool,
//     handleSubmit: PropTypes.func,
//     showAlert: PropTypes.object
// };

function FormBase({
    dataService,
    redirectDelay = 5000,
    redirectTarget = "/home",
    submitValue,
    listedFields = [],
    ...props
}) {
    // console.log("SingleColumnFormBase", props);
    // console.log("SingleColumnFormBase", listedFields);

    const token = useContext(StaffContext).token;
    let history = useHistory();

    const {
        register,
        handleSubmit,
        watch,
        errors,
        reset,
        clearErrors,
        trigger
    } = useForm();
    const focusRefs = useRef([]);

    const [backendErrors, setBackendErrors] = useState(false);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showAlert, setShowAlert] = useState({
        show: props.showAlert ? props.showAlert.show : false,
        type: props.showAlert ? props.showAlert.type : "success",
        message: props.showAlert ? props.showAlert.message : ""
    });
    const [focusTarget, setFocusTarget] = useState(null);
    const [focusIndex, setFocusIndex] = useState(null);
    const [validValues, setValidValues] = useState([]);
    const [loadDependentData, setLoadDependentData] = useState(null);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        // console.log("SingleColumnFormBase listedFields:", listedFields);

        const fields = listedFields;
        GetValidValues(
            fields,
            response => {
                // console.log("DefineForm Values", response.data);
                setValidValues(response.data);
                // if (preset == "edit") {
                // }
                setReady(true);
            },
            error => {
                console.error("SingleColumnFormBase []Effect ERROR", error);
                setReady(true);
            }
        );
    }, []);

    useEffect(() => {
        if (ready) {
            // console.log("SingleFormBase [ready]:", focusRefs);
            setFocusTarget(0);
        }
    }, [ready]);

    useEffect(() => {
        // console.log("SingleFormBase loadDependentData:", loadDependentData);
        if (loadDependentData)
            if (loadDependentData.value != null) {
                setLoadingData(loadDependentData.target);

                GetValidValues(
                    [loadDependentData.value.value],
                    response => {
                        // console.log(
                        //     "UnitForm Values",
                        //     loadDependentData.target,
                        //     _validValues,
                        //     focusTarget
                        // );
                        let _validValues =
                            response.data[loadDependentData.value.value];
                        if (_validValues.length > 0) {
                            setValidValues({
                                ...validValues,
                                [loadDependentData.target]: _validValues
                            });
                        } else {
                            delete validValues[loadDependentData.target];
                            setValidValues({ ...validValues });
                        }
                        setLoadingData(false);
                        // focusNext("_" + loadDependentData.focus);
                        focusNext();
                    },
                    error => {
                        console.error("UnitForm []Effect ERROR", error);
                        setLoadingData(false);
                    }
                );
            } else {
                delete validValues[loadDependentData.target];
                setValidValues({ ...validValues });
            }
    }, [loadDependentData]);

    useEffect(() => {
        // console.log("UnitForm [validValues]Effect", validValues);
    }, [validValues]);

    useEffect(() => {
        setShowAlert({
            show: props.showAlert ? props.showAlert.show : false,
            type: props.showAlert ? props.showAlert.type : "success",
            message: props.showAlert ? props.showAlert.message : ""
        });
    }, [props.showAlert]);

    useEffect(() => {
        // console.log("SingleFormBase [focusTarget]:", focusTarget, focusRefs);
        if (focusTarget != null) {
            focusRefs.current[focusTarget].focus();
            setFocusTarget(null);
            setFocusIndex(focusTarget);
        }
    }, [focusTarget]);

    useEffect(() => {
        // console.log("SingleFormBase [focusIndex]:", focusIndex);
        if (isNaN(focusIndex)) {
            setFocusIndex(
                getIndexOfMatchInsideArray(
                    focusRefs.current,
                    "name",
                    focusIndex
                )
            );
        }
    }, [focusIndex]);

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

    focusRefs.current = [];
    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                backendErrors: backendErrors,
                loading: loading,
                errors: errors,
                ref: element => {
                    if (element) {
                        // console.log(element.getAttribute("name").charAt(0));
                        element.getAttribute("type") != "hidden" &&
                            focusRefs.current.push(element);
                        element.getAttribute("name").charAt(0) != "_" &&
                            register(
                                element,
                                child.props.isDependent
                                    ? validValues[child.props.options]
                                        ? child.props.validation
                                        : {
                                              required: false
                                          }
                                    : child.props.validation
                            );
                    }
                },
                options: child.props.options
                    ? validValues[child.props.options]
                    : null,
                onChange: child.props.dependentOptions
                    ? (target, value, focus = null) =>
                          setLoadDependentData({
                              target: target,
                              value: value,
                              focus: focus
                          })
                    : () => focusNext(),
                onFocus: e => setFocusIndex(e.target.name),
                loadingData:
                    child.props.isDependent == true
                        ? loadingData == child.props.options
                        : undefined,
                disabled:
                    child.props.disabled ||
                    (child.props.dependentOptions &&
                        loadingData == child.props.dependentOptions) ||
                    (child.props.isDependent &&
                        !validValues[child.props.options])
            });
        }
        return child;
    });

    function focusNext(targetFieldName = null) {
        let targetIndex = getNextFocusIndex(
            focusRefs.current,
            focusIndex,
            targetFieldName
        );
        // console.log("focusNext->targetIndex", targetIndex);
        targetIndex != -1
            ? setFocusTarget(targetIndex)
            : handleSubmit(onSubmit)();
    }

    const checkKeyDown = e => {
        // console.log("keycheck", e);
        if (e.keyCode === 13) {
            e.preventDefault();
            focusNext();
        }
    };

    return (
        <div className="form-container general-shadow">
            {!ready ? (
                <Loading type="ball" />
            ) : (
                <form
                    className="form-body"
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={e => checkKeyDown(e)}
                >
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
