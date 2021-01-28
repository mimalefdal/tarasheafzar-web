import React, { useContext } from "react";
import { ApiClient } from ".";

export const tryAdd = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/position/add", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('DepartmentAdd Service',response);
            successCallback(response);
        })
        .catch(error => {
            console.log("DepartmentAdd Service", error);
            failureCallback(error.response);
        });
};

export const getIndex = (token, successCallback, failureCallback) => {
    ApiClient.get("/positions", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("DepartmentIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("DepartmentIndex Service",error.response);
            failureCallback(error.response);
        });
};

export const getItem = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/position", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("DepartmentShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("DepartmentShow Service", error.response);
            failureCallback(error.response);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/position/update", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('DepartmentUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('DepartmentUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const tryDelete = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/position/remove",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log("DepartmentDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("DepartmentDelete Service",error.response);
            failureCallback(error.response);
        });
};
