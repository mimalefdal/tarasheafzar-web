import React, { useContext } from "react";
import { ApiClient } from ".";

export const tryAdd = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/right/add", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('RightAdd Service,response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('RightAdd Service,error.response);
            failureCallback(error.response);
        });
};

export const getIndex = (token, successCallback, failureCallback) => {
    ApiClient.get("/rights", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
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

export const getItem = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/right", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("RightShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("RightShow Service", error.response);
            failureCallback(error.response);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/right/update", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('RightUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('RightUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const tryDelete = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/right/remove",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log("RightDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("RightDelete Service",error.response);
            failureCallback(error.response);
        });
};
