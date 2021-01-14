import { ApiClient } from ".";

export const getValues = (fields, successCallback, failureCallback) => {
    ApiClient.get("/valuelist", {
        params: { fields: fields }
    })
        .then(response => {
            // console.log("GetValues Service" ,response);
            successCallback(response);
        })
        .catch(error => {
            console.log("GetValues Service", error.response);
            failureCallback(error.response);
        });
};
