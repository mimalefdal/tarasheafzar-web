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

export const updateAccessRights = (
    data,
    token,
    successCallback,
    failureCallback
) => {
    ApiClient.post("/rights/updateAccessRights", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('BranchAdd Service,response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('BranchAdd Service,error.response);
            failureCallback(error.response);
        });
};
