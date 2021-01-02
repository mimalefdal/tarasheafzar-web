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
        <Dialog
            open={show}
            maxWidth="md"
            fullWidth={true}
            TransitionComponent={Transition}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    margin: "auto"
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
        </Dialog>
    );
}

export default feedback;
