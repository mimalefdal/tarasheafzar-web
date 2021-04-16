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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

// TODO: big forms Scroll feature must be handled

function feedback({
    show,
    onClose,
    title = "please set a title",
    formComponent,
    confirmation = null,
    ...props
}) {
    const [showConfirm, setShowConfirm] = useState(
        confirmation && confirmation.show && confirmation.show
    );
    const [data, setData] = useState([]);

    return (
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
                    {((confirmation && confirmation.show) || showConfirm) && (
                        <Button
                            classes={confirmation.classes}
                            onClick={() => confirmation.onConfirm(data)}
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
    );
}

export default feedback;
