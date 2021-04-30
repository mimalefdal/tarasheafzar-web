import React, { cloneElement, useEffect, useState } from "react";
import { SINGLE_SELECTION_MODE } from "../../utils/constants";
import { updateSelection } from "../../utils/itemsSelections";
import { pluckSet } from "../../utils/objectArray";

function feedback({
    itemsComponent,
    prevItems,
    targetGroup,
    targetScope,
    onSelectionChange,
    selectionMode = SINGLE_SELECTION_MODE,
    ...props
}) {
    const [selectedItems, setSelectedItems] = useState(pluckSet(prevItems));

    useEffect(() => {
        // console.log("ItemSelectList", selectedItems);
    }, []);

    function handleItemsSelect(item) {
        // console.log("handle select called for", selectedItems);
        setSelectedItems(updateSelection(selectedItems, item, selectionMode));
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
                className: ""
            }
        },
        null
    );
}

export default feedback;
