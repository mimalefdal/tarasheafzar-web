import React, { useEffect, useState } from "react";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { Link as Scroll } from "react-scroll";

function _button({ expandIcon = <MenuOpenIcon />, ...props }) {
    // console.log("expandedButton:expanded", expanded);

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (props.expanded.indexOf(props.item.id) != -1) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    }, [props.expanded]);

    return (
        <Scroll to={props.scrollTarget} smooth={true} offset={-200} spy={true}>
            <button
                className={
                    "operation-icon-btn " +
                    props.className +
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
