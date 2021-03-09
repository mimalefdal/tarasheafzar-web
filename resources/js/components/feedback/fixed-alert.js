import React, { useEffect, useState } from "react";
import { Collapse } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { t } from "../../utils";

function feedback({ show, type, message = "", ...props }) {
    const [open, setOpen] = useState(show);
    const showClassName = open ? " show" : "";

    useEffect(() => {
        setOpen(show);
    }, [show]);
    return (
        <Collapse
            id="alert-collapse"
            in={open}
            className={"fixed-alert general-shadow" + showClassName}
        >
            <Alert
                severity={type}
                variant="filled"
                classes={{ root: props.rootClass }}
            >
                <AlertTitle>{t("alerts." + type)}</AlertTitle>
                {message}
            </Alert>
        </Collapse>
    );
}

export default feedback;
