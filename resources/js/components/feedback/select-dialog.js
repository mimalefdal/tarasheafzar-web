import React, { cloneElement, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ConfirmAndRunDialog } from ".";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

// TODO: big forms Scroll feature must be handled

function feedback({
    show,
    onClose,
    onUpdate,
    title = "please set a title",
    formComponent,
    confirmation = null,
    ...props
}) {
    const [showConfirm, setShowConfirm] = useState(
        confirmation && confirmation.show && confirmation.show
    );
    const [data, setData] = useState([]);
    const [confirmRequest, setConfirmRequest] = useState(false);

    function confirmClicked() {
        // console.log("formDialog->confirmClicked:data", data);
        setConfirmRequest(true);
    }

    function handleConfirmClose(mustUpdate, data) {
        // console.log("handleConfirmClose", mustUpdate, data);
        if (mustUpdate) {
            setShowConfirm(false);
            onUpdate && onUpdate({ data: data });
        } else {
        }
        setConfirmRequest(false);
    }

    return (
        <>
            <Dialog
                open={show}
                maxWidth="md"
                fullWidth={true}
                TransitionComponent={Transition}
                {...props.dialogProps}
            >
                <div className="flex row dialog-header-bar">
                    {/* <DialogTitle classes={{ root: "select-dialog-title" }}>
                        {title}
                    </DialogTitle> */}
                    <div className="flex center select-dialog-title">
                        {title}
                    </div>

                    <div className="filler" />
                    <DialogActions>
                        {((confirmation && confirmation.show) ||
                            showConfirm) && (
                            <Button
                                classes={confirmation.classes}
                                onClick={confirmClicked}
                            >
                                {confirmation.icon}
                            </Button>
                        )}
                        <Button onClick={onClose}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </div>

                <DialogContent>
                    {cloneElement(
                        formComponent,
                        {
                            changesHandler: data => {
                                // console.log(data);
                                setShowConfirm(data.isChanged);
                                data.isChanged && setData(data.data);
                            }
                        },
                        null
                    )}
                </DialogContent>
                <div className="dialog-header-bar"></div>
            </Dialog>
            {confirmation && (
                <ConfirmAndRunDialog
                    dataService={
                        confirmation.dataService
                            ? confirmation.dataService
                            : undefined
                    }
                    runCallback={
                        confirmation.runCallback
                            ? () => {
                                  setShowConfirm(false);
                                  confirmation.runCallback(data);
                              }
                            : undefined
                    }
                    item={data}
                    request={confirmRequest}
                    onClose={handleConfirmClose}
                    {...props.confirmDialogProps}
                />
            )}
        </>
    );
}

export default feedback;
