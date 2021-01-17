import React, { useContext, useEffect, useState } from "react";
import { ConfirmDialog, WaitingDialog } from "../../components/feedback";
import StaffContext from "../../context/staffContext";
import { DeleteDepartment } from "../../services";
import { t } from "../../utils";
import {
    EXECUTION_DONE_FAILURE,
    EXECUTION_DONE_SUCCESS,
    WAIT_FOR_EXECUTION
} from "../../utils/constants";

function Delete({ request, item, onClose, ...props }) {
    // console.log("DeleteDepartmentDialog", item);

    const token = useContext(StaffContext).token;

    const [askToConfirm, setAskToConfirm] = useState(false);
    const [waitForExecution, setWaitForExecution] = useState(false);
    const [executionState, setExecutionState] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);

    useEffect(() => {
        if ((item != null) & request) setAskToConfirm(true);
    }, [request]);

    function onDelete(confirm) {
        if (confirm) {
            setWaitForExecution(true);
            setExecutionState(WAIT_FOR_EXECUTION);

            DeleteDepartment(
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
        onDelete(true);
    }

    return (
        <>
            <ConfirmDialog
                show={askToConfirm}
                onClose={onDelete}
                title={t("alerts.confirm")}
                content={t("expressions.sureDelete")}
                item={item && item.full_title}
            />

            <WaitingDialog
                show={waitForExecution}
                progressMessage={t("expressions.deleteing")}
                doneMessage={responseMessage}
                state={executionState}
                onClose={reset}
                onRetry={retry}
            />
        </>
    );
}

export default Delete;
