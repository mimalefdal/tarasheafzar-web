import React, { useEffect, useState } from "react";
import { existsInArray, removeFromArray } from "../../utils/objectArray";
import CardList from "./CardListBase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function _list({ expansionMode, expansionAttr = "slug", ...props }) {
    // TODO: expansion mode and hanler utilities must implement

    const [expandedItems, setExpandedItems] = useState([]);

    useEffect(() => {
        // console.log("ExpandableCardList", expandedItems);
    }, []);

    function handleItemsExpand(item) {
        // console.log("handle EXPAND called", item.title);
        if (existsInArray(expandedItems, expansionAttr, item[expansionAttr])) {
            setExpandedItems(
                // expandedItems.filter(value => item.id != value.id)
                removeFromArray(expandedItems, expansionAttr, [
                    item[expansionAttr]
                ])
            );
        } else {
            setExpandedItems([...expandedItems, item]);
            // setExpandedItems([item.id]);
        }
    }

    useEffect(() => {
        // console.log("ExpandableCardList[expandedItems]", expandedItems);
    }, [expandedItems]);

    return (
        <CardList
            expansion={{
                handler: handleItemsExpand,
                data: expandedItems,
                expandableItemsField: "childs",
                expansionAttr: expansionAttr,
                className: "card-operation-btn",
                icon: <ExpandMoreIcon />
            }}
            {...props}
        />
    );
}

export default _list;
