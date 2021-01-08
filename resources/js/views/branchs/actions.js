import React, { useContext } from "react";
import { ApiClient } from "../../services";

export const tryDelete = (item, token, history) => {
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
            history.replace(history.location.pathname);
        })
        .catch(error => {
            console.log(error.response);
        });
};
