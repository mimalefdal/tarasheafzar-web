import React, { useContext } from "react";
import { ApiClient } from ".";

export const tryDelete = (item, token, callback) => {
    ApiClient.post(
        "/branch/remove",
        { item: item },
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    )
        .then(response => {
            // console.log(response);
            callback(response);
        })
        .catch(error => {
            // console.log(error.response);
            callback(error.response);
        });
};
