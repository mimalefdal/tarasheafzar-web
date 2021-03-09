import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Slide } from "@material-ui/core";
import { FixedAlert, Loading } from ".";
import { t } from "../../utils";
import {
    EXECUTION_DONE,
    EXECUTION_DONE_FAILURE,
    EXECUTION_DONE_SUCCESS,
    WAIT_FOR_EXECUTION
} from "../../utils/constants";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

WaitingFeedback.propTypes = {};

function WaitingFeedback({
    show,
    onClose,
    onRetry = null,
    state,
    progressMessage = t("expressions.executing"),
    doneMessage = t("expressions.executed"),
    ...props
}) {
    const [runState, setRunState] = useState(WAIT_FOR_EXECUTION);

    useEffect(() => {
        state == null ? setRunState(WAIT_FOR_EXECUTION) : setRunState(state);
    }, [state]);

    let returnComponent = (
        <div className="flex row vertical-center ">
            <div className="flex-filler">{doneMessage}</div>
            {onRetry != null && runState == EXECUTION_DONE_FAILURE && (
                <ReplayIcon
                    onClick={onRetry}
                    className="alert-action pointer"
                />
            )}
            <CloseIcon
                onClick={() => onClose(runState == EXECUTION_DONE_SUCCESS)}
                className="alert-action pointer"
            />
        </div>
    );

    let loadingComponent = (
        <div className="flex row vertical-center ">
            <div className="flex-filler">{progressMessage}</div>
            <Loading type="spin" color="white" className="alert-action" />
        </div>
    );

    return (
        <Dialog
            open={show}
            onClose={onClose}
            TransitionComponent={Transition}
            maxWidth="xs"
            fullWidth={true}
            disableBackdropClick
            disableEscapeKeyDown
        >
            <FixedAlert
                show={runState == WAIT_FOR_EXECUTION}
                type="info"
                message={loadingComponent}
                // rootClass="wait-alert"
            />
            <FixedAlert
                show={runState == EXECUTION_DONE_SUCCESS}
                type="success"
                message={returnComponent}
                // rootClass="wait-alert"
            />
            <FixedAlert
                show={runState == EXECUTION_DONE_FAILURE}
                type="error"
                message={returnComponent}
                // rootClass="wait-alert"
            />
        </Dialog>
    );
}

export default WaitingFeedback;
