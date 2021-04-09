import React, { useEffect, useState } from "react";
import { RightManageCard } from "..";
import { BasicCard } from "../../components/cards";
import { renderActionComponent } from "../../utils";

function _card({ item, entryActions, ...props }) {
    // console.log("RightManageCard", props.className);
    const [expanded, setExpanded] = useState(false);
    const [childDepth, setChildDepth] = useState(0);

    useEffect(() => {
        if (props.expandedItems) {
            // console.log("RightManageCard expanded: ", props.id, expanded);
            if (props.expandedItems.indexOf(item.id) != -1) {
                setExpanded(true);
            } else {
                setExpanded(false);
            }
        }
    }, [props.expandedItems]);

    useEffect(() => {
        if (props.className) {
            console.log("RightManageCard", props.className);
            let n = props.className.match(/child-card/g);
            if (n) setChildDepth(n.length);
        }
    }, []);

    return (
        <>
            <BasicCard
                className={props.className}
                item={item}
                expanded={expanded}
                entryActions={entryActions}
                id={props.id}
            >
                {/* <div className="card-info-box"></div> */}
                {expanded &&
                    item.childs &&
                    item.childs.length > 0 &&
                    item.childs.map((child, _index) => {
                        return (
                            <RightManageCard
                                className={
                                    "child-card" +
                                    childDepth +
                                    (item.childs.length - 1 == _index
                                        ? " last-row"
                                        : "")
                                }
                                item={child}
                                id={child.id}
                                key={_index}
                                expandedItems={props.expandedItems}
                                entryOperations={props.entryOperations}
                                entryActions={renderActionComponent(
                                    props.entryOperations,
                                    child,
                                    _index
                                )}
                            />
                        );
                    })}
            </BasicCard>
        </>
    );
}

export default _card;
