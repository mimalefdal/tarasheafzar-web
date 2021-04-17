import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@material-ui/core";
import { FormAlert, Loading } from ".";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function _dialog({
    show,
    onClose,
    title = "please set a title",
    content = "Please create a content to show here ...",
    preContent = null,
    item = "",
    ...props
}) {
    return (
        <Dialog
            open={show}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth={true}
            disableBackdropClick
            disableEscapeKeyDown
            classes={{ paperFullWidth: "confirm-dialog" }}
            {...props.dialogProps}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {preContent && preContent + " "}
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#FF5733"
                        }}
                    >
                        {item}
                    </span>
                    {" " + content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="primary">
                    خیر
                </Button>
                <Button
                    onClick={() => onClose(true)}
                    color="primary"
                    autoFocus
                    classes={{ root: "general-shadow" }}
                >
                    بلی
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default _dialog;
