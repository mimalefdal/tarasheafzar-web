import React from "react";
import {
    DeleteButton,
    EditButton,
    ExpandButton,
    ViewButton
} from "../components/buttons";

export default function utility(type, props) {
    // console.log("selectActionComponent", type, props);

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
        case "expand":
            return <ExpandButton {...props} scrollTarget={props.item.slug} />;
            break;

        default:
            null;
            break;
    }
}
