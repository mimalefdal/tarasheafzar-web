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
    request,
    item,
    confirmMassageAction = null,
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

    useEffect(() => {
        if ((item != null) & request) setAskToConfirm(true);
    }, [request]);

    function onRun(confirm) {
        if (confirm) {
            setWaitForExecution(true);
            setExecutionState(WAIT_FOR_EXECUTION);

            dataService(
                item,
                token,
                response => {
                    // console.log(response);
                    setResponseMessage(response.data.message);
                    setExecutionState(EXECUTION_DONE_SUCCESS);
                },
                error => {
                    console.log(error);
                    setResponseMessage(error.data.message);
                    setExecutionState(EXECUTION_DONE_FAILURE);
                }
            );
        } else {
            reset(false);
        }
    }

    function reset(update) {
        // console.log("deleteDialog->reset", update);
        setWaitForExecution(false);
        setAskToConfirm(false);
        onClose(update);
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
                content={
                    confirmMassageAction
                        ? confirmMassageAction
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
            />
        </>
    );
}

export default _feedback;