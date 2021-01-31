import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { FormAlert, LineProgress, Loading, RedirectBar } from "../feedback";
import {
    getNextFocusIndex,
    getObjectFromArray,
    MakeUpdatedValidValues,
    t,
    ValueFields,
    ValuesObject
} from "../../utils";
import { ApiClient, GetValidValues } from "../../services";
import StaffContext from "../../context/staffContext";
import { useHistory } from "react-router-dom";
import { getIndexOfMatchInsideArray } from "../../utils/findObject";

// TODO : must Documented

function FormBase({
    dataService,
    redirectDelay = 5000,
    redirectTarget = "/home",
    submitValue,
    listedFields = [],
    ...props
}) {
    // console.log("SingleColumnFormBase", props);

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
    const [validValues, setValidValues] = useState(false);
    const [loadDependentData, setLoadDependentData] = useState(null);
    const [loadingData, setLoadingData] = useState(null);
    const [triggerEditMode, setTriggerEditMode] = useState(false);

    useEffect(() => {
        const fields = listedFields;
        GetValidValues(
            fields,
            response => {
                setValidValues(response.data);

                if (props.item) {
                    // edit mode
                    setTriggerEditMode(true);
                } else {
                    // mode others than edit
                    setReady(true);
                }
            },
            error => {
                console.error(
                    "SingleColumnFormBase GetValidValues ResponseERROR",
                    error
                );
                setReady(true);
            }
        );
    }, []);

    useEffect(() => {
        if (ready & !props.item) {
            // console.log("SingleFormBase:[ready]:", focusRefs);
            setFocusTarget(0);
        }
    }, [ready]);

    useEffect(() => {
        // edit mode
        // console.log("edit Mode validValues", validValues);
        if (triggerEditMode) {
            let fields = [];
            let valuesMap = {};
            React.Children.map(props.children, child => {
                if (React.isValidElement(child)) {
                    if (props.item && child.props.dependentOptions) {
                        // console.log("edit Mode", child.props);
                        fields.push(
                            ...ValueFields(
                                child.props.dependentOptions,
                                child.props.initialValue
                            )
                        );
                        valuesMap = {
                            ...valuesMap,
                            ...ValuesObject(
                                child.props.dependentOptions,
                                child.props.initialValue
                            )
                        };
                        // console.log("edit Mode", valuesMap);
                    }
                }
            });
            fields.length == 0
                ? setReady(true)
                : GetValidValues(
                      fields,
                      response => {
                          // console.log(
                          //     "UnitForm:[triggerEditMode]:Response",
                          //     response.data
                          // );

                          let updatedValidValues = MakeUpdatedValidValues(
                              validValues,
                              response.data,
                              valuesMap
                          );
                          setLoadingData(false);
                          setValidValues(
                              MakeUpdatedValidValues(
                                  validValues,
                                  response.data,
                                  valuesMap
                              )
                          );
                          setReady(true);

                          // focusNext();
                      },
                      error => {
                          console.error(
                              "UnitForm:[triggerEditMode]:ERROR",
                              error
                          );
                      }
                  );
        }
    }, [triggerEditMode]);

    useEffect(() => {
        // console.log("SingleFormBase:[loadDependentData]:loadDependentData", loadDependentData);
        if (loadDependentData)
            if (loadDependentData.value != null) {
                // master field value selected
                setLoadingData(Object.keys(loadDependentData.target));

                let fields = ValueFields(
                    loadDependentData.target,
                    loadDependentData.value.value
                );
                let valuesMap = ValuesObject(
                    loadDependentData.target,
                    loadDependentData.value.value
                );

                // console.log("_valueObject", _valueObject);
                GetValidValues(
                    fields,
                    response => {
                        let updatedValidValues = MakeUpdatedValidValues(
                            validValues,
                            response.data,
                            valuesMap
                        );
                        setLoadingData(false);
                        setValidValues(
                            MakeUpdatedValidValues(
                                validValues,
                                response.data,
                                valuesMap
                            )
                        );
                        focusNext();
                    },
                    error => {
                        console.error("UnitForm:[]:ERROR", error);
                        setLoadingData(false);
                    }
                );
            } else {
                // cleared master field
                Object.keys(loadDependentData.target).map(key => {
                    delete validValues[key];
                });
                setValidValues({ ...validValues });
            }
        // setLoadDependentData(null);
    }, [loadDependentData]);

    // useEffect(() => {
    //     console.log("UnitForm:[validValues]:validValues", validValues);
    // }, [validValues]);

    // useEffect(() => {
    //     // console.log("UnitForm:[loadingData]", loadingData);
    // }, [loadingData]);

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
        dataService(data, token, submitResponse, submitError);
    };

    function submitResponse(response) {
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
            reset();
        }
        response.data.redirect && setRedirect(true);
    }

    function submitError(error) {
        console.log("SingleColumnFormBase", error);
        setLoading(false);

        if (error.status == 422) {
            setBackendErrors(error.data.errors);
            if ("slug" in error.data.errors)
                setShowAlert({
                    show: true,
                    type: "error",
                    message: error.data.errors.slug
                });
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

    function renderFields() {
        focusRefs.current = [];
        return React.Children.map(props.children, child => {
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
                    initialOptionIndex:
                        validValues[child.props.options] &&
                        child.props.initialValue &&
                        getIndexOfMatchInsideArray(
                            validValues[child.props.options],
                            "value",
                            child.props.initialValue
                        ),
                    onChange: data => {
                        child.props.dependentOptions
                            ? setLoadDependentData(data)
                            : child.props.options
                            ? data.target &&
                              data.target.value != null &&
                              focusNext()
                            : null;
                    },
                    onFocus: e => {
                        setFocusIndex(e.target.name);
                    },
                    loadingData:
                        child.props.isDependent == true
                            ? loadingData &&
                              loadingData.includes(child.props.options)
                            : undefined,
                    disabled:
                        child.props.disabled ||
                        (child.props.isDependent &&
                            !validValues[child.props.options])
                });
            }
            return child;
        });
    }

    function focusNext(targetFieldName = null) {
        // console.log("focusNext->focusIndex", focusIndex, targetFieldName);
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
                <div>
                    <Loading type="ball" />
                </div>
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

                    {renderFields()}

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
