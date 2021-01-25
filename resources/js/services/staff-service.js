import React, { useContext } from "react";
import { ApiClient } from ".";

export const tryAdd = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/staff/add", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('StaffAdd Service,response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('StaffAdd Service,error.response);
            failureCallback(error.response);
        });
};

export const getIndex = (token, successCallback, failureCallback) => {
    ApiClient.get("/staff", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("StaffIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("StaffIndex Service", error.response);
            failureCallback(error.response);
        });
};

export const getItem = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/anstaff", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("StaffShow Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("StaffShow Service", error.response);
            failureCallback(error.response);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    ApiClient.post("", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log('StaffUpdate Service',response);
            successCallback(response);
        })
        .catch(error => {
            // console.log('StaffUpdate Service',error.response);
            failureCallback(error.response);
        });
};

export const tryDelete = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log("StaffDelete Service",response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("StaffDelete Service",error.response);
            failureCallback(error.response);
        });
};