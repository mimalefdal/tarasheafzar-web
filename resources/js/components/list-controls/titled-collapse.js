import React, { useState } from "react";
import { Children } from "react";
import { Collapse } from "@material-ui/core";
import { ExpanderIcon, Title } from "../view-controls";
import { EditButton, ExpandButton } from "../buttons";

function _control({ title, initialState = true, btnSet, ...props }) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(initialState);

    useState(() => {
        // console.log(props);
        // props.children && console.log(props.children.length);

        !props.children && setState(false);
    }, []);

    const toggleExpand = () => {
        state && setOpen(!open);
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <div
                className={
                    "expandable-group-title flex row " + (!state && "disabled")
                }
                onClick={toggleExpand}
            >
                <div
                    style={{
                        marginInlineEnd: "0.5rem",
                        visibility: state ? "visible" : "hidden"
                    }}
                    onClick={toggleExpand}
                >
                    <ExpanderIcon isExpanded={open} />
                </div>
                <div>{title}</div>
                <div className="flex-filler"></div>
                <div id="actions">{btnSet && btnSet}</div>
            </div>
            <Collapse in={open} timeout={600}>
                <div className="expandable-area flex row ">
                    {props.children}
                </div>
            </Collapse>
        </div>
    );
}

export default _control;
