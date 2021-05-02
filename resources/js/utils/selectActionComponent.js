import React from "react";
import {
    AddButton,
    DeleteButton,
    EditButton,
    ExpandButton,
    StopButton,
    SuspenseTogglerButton,
    ViewButton
} from "../components/buttons";
export default function utility(type, props) {
    // console.log("selectActionComponent", type, props);

    switch (type) {
        case "add":
            return <AddButton {...props} />;
            break;
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
            return (
                <ExpandButton
                    {...props}
                    scrollTarget={`${props.item[props.expansionAttr]}`}
                />
            );
            break;

        case "suspendToggle":
            return <SuspenseTogglerButton {...props} />;
            break;

        default:
            null;
            break;
    }
}
