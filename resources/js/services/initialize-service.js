import { ApiClient } from ".";

export const _getStatus = (params, token, successCallback, failureCallback) => {
    // console.log("InitializeService:getStatus:params:", params);
    ApiClient.get("/initialize/status", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        },
        params: params
    })
        .then(response => {
            // console.log("InitializeService:getStatus:RESPONSE", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("InitializeService:getStatus:ERROR", error);
            failureCallback(error.response);
        });
};

export const _installLicence = (
    data,
    token,
    successCallback,
    failureCallback
) => {
    ApiClient.post("/initialize/setlicence", data, {
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
            // console.log("InitializeCEO Service", error);
            failureCallback(error.response);
        });
};

export const _initiateSystem = (token, successCallback, failureCallback) => {
    ApiClient.post("/initialize/initiateSystem", [], {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("InitializeFeatures Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("InitializeFeatures Service", error.response);
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
