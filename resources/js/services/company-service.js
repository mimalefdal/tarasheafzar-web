import React from "react";
import { ApiClient } from ".";

export const getInformation = (
    params,
    token,
    successCallback,
    failureCallback
) => {
    ApiClient.get("/company", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("Company Service [getInformation]", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("Company Service [getInformation]", error);
            failureCallback(error.response);
        });
};
