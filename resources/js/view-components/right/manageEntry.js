import React, { Component, useEffect, useState } from "react";
import { RightEntry } from "..";
import { OperationEntry } from "../../components/tables";
import { currentLang, renderActionComponent, t } from "../../utils";

function _entry({ item, entryActions, index, ...props }) {
    //transform item data to displayable format
    let activation;
    if (item.activation) {
        activation = t("labels.active");
    } else {
        activation = t("labels.deactive");
    }
    const id = item.id;
    const title = item.title;

    const displayItem = {
        title: title,
        id: id,
        status: activation
    };

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (props.expandedItems) {
            // console.log("_entry expanded: ", props.expandedItems);
            if (props.expandedItems.indexOf(item.id) != -1) {
                setExpanded(true);
            } else {
                setExpanded(false);
            }
        }
    }, [props.expandedItems]);

    return (
        <>
            <OperationEntry
                id={props.id}
                index={index}
                item={displayItem}
                entryActions={entryActions}
                tableMap={props.tableMap}
                expanded={expanded}
                className={props.className}
            />
            {expanded &&
                item.childs &&
                item.childs.length > 0 &&
                item.childs.map((child, _index) => {
                    // console.log(item.childs.length - 1 == _index);

                    return (
                        <RightEntry
                            className={
                                "child-row" +
                                (item.childs.length - 1 == _index
                                    ? " last-row"
                                    : "")
                            }
                            id={child.id}
                            // index={index}
                            item={child}
                            key={child.id}
                            tableMap={props.tableMap}
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
        </>
    );
}

export default _entry;
