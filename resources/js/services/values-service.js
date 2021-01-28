import { ApiClient } from ".";

export const getValues = (fields, successCallback, failureCallback) => {
    // console.log("GetValues Service:fields:", fields);
    ApiClient.get("/valuelist", {
        params: { fields: fields }
    })
        .then(response => {
            // console.log("GetValues Service:response", response);
            successCallback(response);
        })
        .catch(error => {
            // console.error("GetValues Service:ERROR", error);
            failureCallback(error.response);
        });
};
