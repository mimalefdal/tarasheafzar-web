import React from "react";
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
    title = "please set a title",
    formComponent,
    ...props
}) {
    return (
        <>
            <Dialog
                open={show}
                maxWidth={
                    props.dialogProps && props.dialogProps.maxWidth
                        ? props.dialogProps.maxWidth
                        : "md"
                }
                fullWidth={true}
                TransitionComponent={Transition}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
                        margin: "auto",
                        minHeight: "6vh"
                    }}
                >
                    <DialogTitle>{title}</DialogTitle>
                    <div style={{ flexGrow: 1 }} />
                    <DialogActions>
                        <Button onClick={onClose}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </div>

                <DialogContent>{formComponent}</DialogContent>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "90%",
                        margin: "auto",
                        minHeight: "6vh"
                    }}
                ></div>
            </Dialog>
        </>
    );
}

export default feedback;
