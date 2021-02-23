import { ApiClient } from ".";

export const getIndex = (token, successCallback, failureCallback) => {
    ApiClient.get("/features", {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            // console.log("DepartmentIndex Service", response);
            successCallback(response);
        })
        .catch(error => {
            // console.log("DepartmentIndex Service",error.response);
            failureCallback(error.response);
        });
};
