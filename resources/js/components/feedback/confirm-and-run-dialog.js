import React, { useContext, useEffect, useState } from "react";
import { ConfirmDialog, WaitingDialog } from ".";
import StaffContext from "../../context/staffContext";
import { t } from "../../utils";
import {
    EXECUTION_DONE_FAILURE,
    EXECUTION_DONE_SUCCESS,
    WAIT_FOR_EXECUTION
} from "../../utils/constants";

function _feedback({
    dataService,
    runCallback,
    request,
    item,
    confirmMessageAction = null,
    confirmMessageData = null,
    confirmPreContent = null,
    runProgressMessage = t("expressions.executing"),
    onClose,
    ...props
}) {
    // console.log("DeleteDepartmentDialog", item);

    const token = useContext(StaffContext).token;

    const [askToConfirm, setAskToConfirm] = useState(false);
    const [waitForExecution, setWaitForExecution] = useState(false);
    const [executionState, setExecutionState] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if ((item != null) & request) setAskToConfirm(true);
    }, [request]);

    function onRun(confirm) {
        if (confirm) {
            if (runCallback) {
                runCallback();
                reset(false);
            } else {
                setWaitForExecution(true);
                setExecutionState(WAIT_FOR_EXECUTION);
                dataService(
                    item,
                    token,
                    response => {
                        console.log(response);
                        setResponse(response.data);
                        setResponseMessage(response.data.message);
                        setExecutionState(EXECUTION_DONE_SUCCESS);
                    },
                    error => {
                        console.log(error);
                        setResponseMessage(error.data.message);
                        setExecutionState(EXECUTION_DONE_FAILURE);
                    }
                );
            }
        } else {
            reset(false);
        }
    }

    function reset(mustUpdate) {
        // console.log("deleteDialog->reset", mustUpdate);
        setWaitForExecution(false);
        setAskToConfirm(false);
        onClose(mustUpdate, mustUpdate && response);
    }

    function retry() {
        onRun(true);
    }

    return (
        <>
            <ConfirmDialog
                show={askToConfirm}
                onClose={onRun}
                title={t("alerts.confirm")}
                dialogProps={{
                    maxWidth: "sm",
                    classes: { paperFullWidth: "confirm-dialog" }
                }}
                content={
                    confirmMessageAction
                        ? confirmMessageAction
                        : t("expressions.sureRun")
                }
                preContent={confirmPreContent}
                item={
                    confirmMessageData
                        ? confirmMessageData
                        : item && item.full_title
                }
            />

            <WaitingDialog
                show={waitForExecution}
                progressMessage={runProgressMessage}
                doneMessage={responseMessage}
                state={executionState}
                onClose={reset}
                onRetry={retry}
                dialogProps={{ maxWidth: "xs" }}
            />
        </>
    );
}

export default _feedback;
