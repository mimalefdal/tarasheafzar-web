import React, { useEffect, useState } from "react";
import { RightManageCard } from "..";
import { BasicCard } from "../../components/cards";
import { renderActionComponent } from "../../utils";

function _card({ item, entryActions, ...props }) {
    // console.log("RightManageCard", props.childItems);

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(false);
    const [childDepth, setChildDepth] = useState(0);

    // useEffect(() => {
    //     if (props.expandedItems) {
    //         // console.log("RightManageCard expanded: ", props.id, expanded);
    //         if (props.expandedItems.indexOf(item.id) != -1) {
    //             setExpanded(true);
    //         } else {
    //             setExpanded(false);
    //         }
    //     }
    // }, [props.expandedItems]);

    useEffect(() => {
        if (props.className) {
            // console.log("RightManageCard", props.className);
            let n = props.className.match(/child-card/g);
            if (n) setChildDepth(n.length);
        }
    }, []);

    useEffect(() => {
        setExpanded(props.expanded);
    }, [props.expanded]);

    useEffect(() => {
        // console.log(props.selected, item.title, props.selected);
        props.selected != undefined && setSelected(props.selected);
    }, [props.selected]);

    return (
        <>
            <BasicCard
                className={props.className + (selected ? " selected" : "")}
                item={item}
                expanded={expanded}
                entryActions={entryActions}
                id={props.id}
                handleClick={
                    props.handleSelect
                        ? () => props.handleSelect(item)
                        : undefined
                }
            >
                {/* <div className="card-info-box"></div> */}
            </BasicCard>
            {expanded && props.childItems}
        </>
    );
}

export default _card;
