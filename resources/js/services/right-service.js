import React from "react";
import { ApiClient } from ".";

export const _getIndex = (params, token, successCallback, failureCallback) => {
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

export const _updateAccessRights = (
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
            failureCallback(error);
        });
};

export const _updateManagedbyRights = (
    data,
    token,
    successCallback,
    failureCallback
) => {
    ApiClient.post("/rights/updateManagedbyRights", data, {
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
            failureCallback(error);
        });
};

export const _updateOwnedbyRights = (
    data,
    token,
    successCallback,
    failureCallback
) => {
    ApiClient.post("/rights/updateOwnedbyRights", data, {
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
            failureCallback(error);
        });
};
