import React, { useContext } from "react";
import { ApiClient } from ".";

export const tryAdd = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/joblevel/add", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('JoblevelAdd Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.error("JoblevelAdd Service", error);
            failureCallback(error.response);
        });
};

export const getIndex = (token, successCallback, failureCallback) => {
    ApiClient.get("/joblevels", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("JoblevelIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("JoblevelIndex Service",error.response);
            failureCallback(error.response);
        });
};

export const getItem = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/joblevel", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("JoblevelShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("JoblevelShow Service", error.response);
            failureCallback(error.response);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/joblevel/update", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('JoblevelUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('JoblevelUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const tryDelete = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/joblevel/remove",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log("JoblevelDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("JoblevelDelete Service",error.response);
            failureCallback(error.response);
        });
};
