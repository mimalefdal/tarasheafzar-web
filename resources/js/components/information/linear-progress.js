import { LinearProgress } from "@material-ui/core";
import React from "react";

function component(props) {
    return (
        <LinearProgress
            classes={{
                colorPrimary: "form-progress primary",
                barColorPrimary: "form-progress barPrimary"
            }}
        />
    );
}

export default component;
