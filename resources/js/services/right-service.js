import React from "react";
import { ApiClient } from ".";

export const getIndex = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/rights", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("RightIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("RightIndex Service",error.response);
            failureCallback(error.response);
        });
};
