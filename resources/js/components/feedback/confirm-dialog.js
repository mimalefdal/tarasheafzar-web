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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function dialog({
    show,
    onClose,
    title = "please set a title",
    content = "Please create a content to show here ...",
    item = "",
    ...props
}) {
    return (
        <Dialog
            open={show}
            onClose={onClose}
            TransitionComponent={Transition}
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
                {/* <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {item}
                </div> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="primary">
                    خیر
                </Button>
                <Button onClick={() => onClose(true)} color="primary" autoFocus>
                    بلی
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default dialog;
