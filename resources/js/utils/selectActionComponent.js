import React from "react";
import { DeleteButton, EditButton, ViewButton } from "../components/buttons";

export default function utility(type, props) {
    // console.log(type, props);

    switch (type) {
        case "view":
            return <ViewButton {...props} />;
            break;
        case "edit":
            return <EditButton {...props} />;
            break;
        case "delete":
            return <DeleteButton {...props} />;
            break;

        default:
            null;
            break;
    }
}
