import React from "react";
import { RightSelectList } from "..";
import { SelectDialog } from "../../components/feedback";
import { t } from "../../utils";
import DoneIcon from "@material-ui/icons/Done";

function _selectDialog({
    show,
    onClose,
    onUpdate,
    operationData,
    item,
    ...props
}) {
    return (
        <SelectDialog
            show={show}
            onClose={onClose}
            onUpdate={data => {
                // console.log(data);
                onUpdate(data.data.rights);
            }}
            // title={t("forms.selectRights")}
            title={operationData.operation}
            confirmation={{
                classes: { root: "btn-confirm" },
                icon: <DoneIcon />,
                show: false,
                dataService: operationData.dataService
                // runCallback: (...params) => {
                //     console.log(
                //         "show->SelectDialog->runCallback()",
                //         params
                //     );
                //     setShowRights(false);
                // }
            }}
            dialogProps={{
                maxWidth: "md"
            }}
            confirmDialogProps={{
                confirmMessageAction: t("expressions.sureAboutChanges")
            }}
            formComponent={
                <RightSelectList
                    prevRights={item[operationData.rightsField]}
                    targetScope={operationData.targetScope}
                    targetGroup={operationData.targetGroup}
                />
            }
        />
    );
}

export default _selectDialog;
