import React from "react";
import { ApiClient } from ".";

export const tryAdd = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/roles/add", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('PositionAdd Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.error("PositionAdd Service", error);
            failureCallback(error.response);
        });
};

export const _getIndex = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/roles/", {
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

export const getItem = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/role", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("PositionShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("PositionShow Service", error.response);
            failureCallback(error);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/roles/update", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('PositionUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('PositionUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const _tryUpdateHolders = (
    data,
    token,
    successCallback,
    failureCallback
) => {
    ApiClient.post("/roles/updateholders", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('PositionUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('PositionUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const tryDelete = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/roles/delete",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log("PositionDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("PositionDelete Service",error.response);
            failureCallback(error.response);
        });
};
