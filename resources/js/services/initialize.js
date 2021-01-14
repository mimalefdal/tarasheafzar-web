import { ApiClient } from ".";

export const getStatus = (params, token, successCallback, failureCallback) => {
    ApiClient.get("/initialize/status", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("InitializeStatus Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("InitializeStatus Service", error.response);
            failureCallback(error.response);
        });
};

export const defineCeo = (data, token, successCallback, failureCallback) => {
    ApiClient.post("/initialize/defineceo", data, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("InitializeCEO Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("InitializeCEO Service", error.response);
            failureCallback(error.response);
        });
};
