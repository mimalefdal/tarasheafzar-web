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

export const getIndex = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/staff/index", {
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
            // console.log("StaffIndex Service", error);
            failureCallback(error);
        });
};

export const _getStaffCrew = (
    params,
    token,
    successCallback,
    failureCallback
) => {
    ApiClient.get("/staff", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("StaffIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("StaffIndex Service", error);
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
            failureCallback(error);
        });
};

export const tryUpdate = (data, token, successCallback, failureCallback) => {
    // console.log("StaffUpdate Service:data->", data);
    ApiClient.post("/staff/update", data, {
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
        "/staff/remove",
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

export const tryRestore = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/staff/restore",
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

export const trySupspend = (item, token, successCallback, failureCallback) => {
    ApiClient.post(
        "/staff/suspend",
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
