import React, { useEffect, useState } from "react";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { Link as Scroll } from "react-scroll";

function _button({ expandIcon = <MenuOpenIcon />, ...props }) {
    // console.log("expandedButton:expanded", props.expandable);

    const [expandable, setExpandable] = useState(props.expandable(props.item));
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        // console.log(props.expanded(props.item));
        props.expanded && setExpanded(props.expanded(props.item));
    }, [props.expanded]);

    return (
        <Scroll
            to={props.scrollTarget}
            smooth={true}
            offset={props.offset ? props.offset : -200}
            // spy={true}
        >
            <button
                className={
                    "operation-icon-btn " +
                    props.className +
                    (expandable ? "" : " disabled") +
                    (expanded ? " active" : "")
                }
                style={props.style}
                onClick={props.onClick && props.onClick}
            >
                {expandIcon}
                {/* <MenuOpenIcon /> */}
            </button>
        </Scroll>
    );
}

export default _button;
