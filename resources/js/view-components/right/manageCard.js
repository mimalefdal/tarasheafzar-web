import { Collapse } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RightManageCard } from "..";
import { BasicCard } from "../../components/cards";
import { renderActionComponent } from "../../utils";

function _card({ item, entryActions, ...props }) {
    // console.log("RightManageCard", props.childItems);

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        // console.log(item.id, expanded);
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
            <Collapse
                in={expanded}
                style={{
                    width: "100%"
                }}
                timeout={900}
                classes={{ wrapperInner: "flex column end" }}
            >
                {props.childItems}
            </Collapse>
            {/* {expanded && props.childItems} */}
        </>
    );
}

export default _card;
