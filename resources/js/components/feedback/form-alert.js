import { Collapse } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { t } from "../../utils";

function feedback({ show, type, message = "", ...props }) {
    const [open, setOpen] = useState(show);
    const showClassName = open ? " show" : "";

    useEffect(() => {
        setOpen(show);
    }, [show]);
    return (
        <Collapse
            in={open}
            className={"form-alert general-shadow" + showClassName}
        >
            <Alert
                severity={type}
                variant="filled"
                onClick={() => {
                    setOpen(false);
                }}
            >
                <AlertTitle>{t("alerts." + type)}</AlertTitle>
                {message}
            </Alert>
        </Collapse>
    );
}

export default feedback;
