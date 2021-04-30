import React, { useState } from "react";
import { Children } from "react";
import { Collapse } from "@material-ui/core";
import { ExpanderIcon, Title } from "../view-controls";
import { EditButton, ExpandButton } from "../buttons";

function _control({
    title,
    initialState = true,
    btnSet,
    timeout = 400,
    ...props
}) {
    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(initialState);

    useState(() => {
        // console.log(title, props.itemsCount);
        // props.children && console.log(props.children.length);

        (!props.children ||
            (props.itemsCount != undefined && props.itemsCount == 0)) &&
            setEnabled(false);
    }, []);

    const toggleExpand = () => {
        enabled && setOpen(!open);
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <div
                className={
                    "expandable-group-title flex row " +
                    (!enabled && "disabled")
                }
            >
                <div
                    style={{
                        marginInlineEnd: "0.5rem",
                        visibility: enabled ? "visible" : "hidden"
                    }}
                    onClick={toggleExpand}
                >
                    <ExpanderIcon isExpanded={open} />
                </div>
                <div onClick={toggleExpand}>{title}</div>
                <div className="flex-filler" onClick={toggleExpand}></div>
                <div id="actions">{btnSet && enabled && open && btnSet}</div>
            </div>
            <Collapse in={open} timeout={timeout}>
                <div className="expandable-area flex row ">
                    {props.children}
                </div>
            </Collapse>
        </div>
    );
}

export default _control;
