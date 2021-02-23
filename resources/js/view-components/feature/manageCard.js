import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Collapse
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import { ExpandButton } from "../../components/buttons";
import { BasicCard } from "../../components/cards";
import { findObjectInsideArray } from "../../utils/findObject";

function _manageCard(props) {
    // console.log("_featureCard", props, props.key);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        // console.log("_featureCard expanded: ", props.id);
        if (props.expandedItems.indexOf(props.item.id) != -1) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    }, [props.expandedItems]);

    return (
        <>
            <BasicCard expanded={expanded} {...props}>
                <p>نصب : {props.item.state}</p>
                <p>حالت : {props.item.activation}</p>
                <p>ابزار : {props.item.tools.length}</p>
            </BasicCard>
            <Collapse in={expanded} style={{ width: "100%" }} timeout={900}>
                <div className="sub-cards-list">
                    {props.item.tools.map(tool => (
                        <BasicCard
                            className="sub-card"
                            key={tool.id}
                            item={tool}
                        />
                    ))}
                </div>
            </Collapse>
        </>
    );
}

export default _manageCard;
