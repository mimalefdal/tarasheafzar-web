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
            // console.log('PositionAdd Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.error("PositionAdd Service", error);
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
            // console.log("PositionIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("PositionIndex Service",error.response);
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
            // console.log("PositionShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("PositionShow Service", error.response);
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
            // console.log("PositionDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("PositionDelete Service",error.response);
            failureCallback(error.response);
        });
};
