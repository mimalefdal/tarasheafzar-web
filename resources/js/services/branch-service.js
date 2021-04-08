import React, { useContext } from "react";
import { ApiClient } from ".";

export const tryAdd = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/branch/add", data, {
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

export const getIndex = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/branches", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("BranchIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("BranchIndex Service",error.response);
            failureCallback(error.response);
        });
};

export const getItem = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/branch", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("BranchShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("BranchShow Service", error.response);
            failureCallback(error.response);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/branch/update", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('BranchUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('BranchUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const tryDelete = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/branch/remove",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log("BranchDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("BranchDelete Service",error.response);
            failureCallback(error.response);
        });
};
