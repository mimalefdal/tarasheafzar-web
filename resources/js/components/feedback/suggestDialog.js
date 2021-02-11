import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, Slide } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { EMPTY_LIST, GENREAL, NO_TITLE_SET } from "../../utils/constants";
import { DefineFormOf, t } from "../../utils";
import { BranchForm, DepartmentForm } from "../../view-components";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

// TODO: big forms Scroll feature must be handled

function feedback({ show, onClose, preset = GENREAL, data = null, ...props }) {
    const [title, setTitle] = useState(
        props.title ? props.title : t("expressions.suggestDialogDefaultTitle")
    );
    const [actions, setActions] = useState(
        props.actions ? props.actions : null
    );
    const [value, setValue] = useState("");
    const [innerComponent, setInnerComponent] = useState(null);
    const [actionGuide, setActionGuide] = useState(
        props.actionGuide ? props.actionGuide : t("blocks.noSuggestionsFound")
    );
    const [message, setMessage] = useState(
        props.message ? props.message : null
    );

    useEffect(() => {
        if (show) {
            // console.log("SuggestDialog:[]:preset", preset);
            // console.log("SuggestDialog:[]:data", data);
            setInnerComponent(null);
            switch (preset) {
                case EMPTY_LIST:
                    setTitle(
                        t("expressions.noOptionsDefined", {
                            field: t("labels." + data.targetField)
                        })
                    );

                    let _value = data.dependerValue
                        ? data.dependerValue
                        : data.targetField;
                    setValue(_value);
                    renderActions(_value);

                    setActionGuide(
                        t("blocks.noOptionSuggestion", {
                            attribute: t("labels." + _value)
                        })
                    );
                    break;

                default:
                    break;
            }
        }
    }, [show]);

    function renderActions(value) {
        if (DefineFormOf(value)) {
            setMessage(null);
            setActions(
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setInnerComponent(DefineFormOf(value));
                    }}
                >
                    {t("labels.submit-add") + " " + t("labels." + value)}
                </button>
            );
        } else {
            console.log(
                "SuggestDialog:renderActions()",
                "Undefined Value:",
                value
            );
            setActions(null);
            setMessage(
                t("blocks.referToTool", {
                    attribute: t("labels." + value)
                })
            );
        }
    }

    function getOnCloseData() {
        let _data = null;
        switch (preset) {
            case EMPTY_LIST:
                _data = {
                    refreshNeeded: innerComponent != null,
                    dependerValue: value,
                    optionsLabel: data.valueList
                };
                break;

            default:
                break;
        }

        return _data;
    }

    return (
        <Dialog
            open={show}
            maxWidth="sm"
            fullWidth={true}
            TransitionComponent={Transition}
        >
            <div style={{ padding: "2rem" }}>
                <div className="flex column center">
                    {innerComponent == null && (
                        <>
                            <div style={{ fontSize: "1rem", fontWeight: 900 }}>
                                {title}
                            </div>

                            <div style={{ textAlign: "center" }}>
                                {message}
                                {actions && actionGuide}
                            </div>
                        </>
                    )}
                    {innerComponent != null && innerComponent}
                    <DialogActions>
                        {innerComponent == null && actions && actions}
                        <button
                            className="btn"
                            style={{ fontSize: "0.6rem" }}
                            onClick={() => onClose(getOnCloseData())}
                        >
                            {t("labels.return")}
                        </button>
                    </DialogActions>
                </div>
            </div>
        </Dialog>
    );
}

export default feedback;
