import React, { cloneElement, useEffect, useState } from "react";
import { SINGLE_SELECTION_MODE } from "../../utils/constants";
import { updateSelection } from "../../utils/itemsSelections";
import { pluckSet } from "../../utils/objectArray";

function feedback({
    itemsComponent,
    prevItems = [],
    targetGroup,
    targetScope = {},
    onSelectionChange,
    selectionMode = SINGLE_SELECTION_MODE,
    selectionAttr = "slug",
    ...props
}) {
    const [selectedItems, setSelectedItems] = useState(pluckSet(prevItems));

    useEffect(() => {
        // console.log("ItemSelectList", selectionAttr);
    }, []);

    function handleItemsSelect(item) {
        // console.log("handle select called for", item);
        setSelectedItems(
            updateSelection(selectedItems, item, selectionMode, selectionAttr)
        );
    }

    useEffect(() => {
        // console.log("SelectList[selectedItems]", selectedItems);
        onSelectionChange(selectedItems);
    }, [selectedItems]);

    return cloneElement(
        itemsComponent,
        {
            selection: {
                handler: handleItemsSelect,
                data: selectedItems,
                className: "",
                selectionAttr: selectionAttr
            }
        },
        null
    );
}

export default feedback;
