import React, { useEffect, useState } from "react";
import { LinearProgress } from "@material-ui/core";

function feedback({ value, ...props }) {
    const [progress, setProgress] = useState(value);
    useEffect(() => setProgress(value));

    return (
        <LinearProgress
            classes={{
                colorPrimary: "form-redirect primary",
                barColorPrimary: "form-redirect barPrimary"
            }}
            variant="determinate"
            value={progress}
        />
    );
}

export default feedback;
