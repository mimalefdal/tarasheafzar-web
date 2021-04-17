import React, { useEffect, useState } from "react";
import { CardList } from "../../components/lists";
import { GetRightList } from "../../services";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MULTIPLE_NESTED_SELECTION_MODE } from "../../utils/constants";
import { RightManageCard } from "..";
import {
    equals,
    existsInArray,
    removeFromArray
} from "../../utils/objectArray";
import { updateSelection } from "../../utils/itemsSelections";

function _list({
    prevRights,
    targetGroup,
    targetScope,
    changesHandler = null,
    ...props
}) {
    const [rightsGroup, setRightsGroup] = useState(targetGroup);
    const [expandedRights, setExpandedRights] = useState([]);
    const [selectedRights, setSelectedRights] = useState(prevRights);
    const [rightsSelectionMode, setRightsSelectionMode] = useState(
        MULTIPLE_NESTED_SELECTION_MODE
    );

    useEffect(() => {
        // console.log("RightsSelectList", changesHandler);
    }, []);

    function handleRightsExpand(item) {
        // console.log("handle EXPAND called", item);
        if (existsInArray(expandedRights, "id", item.id))
            setExpandedRights(
                // expandedRights.filter(value => item.id != value.id)
                removeFromArray(expandedRights, "id", [item.id])
            );
        else {
            setExpandedRights([...expandedRights, item]);
            // setExpandedItems([item.id]);
        }
    }

    function handleRightsSelect(item) {
        // console.log("handle select called for", item);
        setSelectedRights(
            updateSelection(selectedRights, item, rightsSelectionMode)
        );
    }

    useEffect(() => {
        changesHandler &&
            changesHandler({
                isChanged: !equals(selectedRights, prevRights),
                data: { rights: selectedRights, scope: targetScope }
            });
    }, [selectedRights]);

    return (
        <CardList
            dataService={GetRightList}
            dataRequestParams={{ group: rightsGroup }}
            cardComponent={<RightManageCard />}
            entryOperations={[]}
            selection={{
                handler: handleRightsSelect,
                data: selectedRights,
                className: ""
            }}
            expansion={{
                handler: handleRightsExpand,
                data: expandedRights,
                expandableItemsField: "childs",
                className: "card-operation-btn",
                icon: <ExpandMoreIcon />
            }}
        />
    );
}

export default _list;
