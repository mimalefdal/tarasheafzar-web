import React, { useContext } from "react";
import { ApiClient } from ".";

export const tryAdd = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/unit/add", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('UnitAdd Service',response);
            successCallback(response);
        })
        .catch(error => {
            console.log("UnitAdd Service", error);
            failureCallback(error.response);
        });
};

export const getIndex = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/units", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("UnitIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("UnitIndex Service",error.response);
            failureCallback(error.response);
        });
};

export const getItem = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/unit", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("UnitShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("UnitShow Service", error.response);
            failureCallback(error.response);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/unit/update", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('UnitUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('UnitUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const tryDelete = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/unit/remove",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log("UnitDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("UnitDelete Service",error.response);
            failureCallback(error.response);
        });
};
