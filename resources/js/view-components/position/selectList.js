import React, { useEffect } from "react";
import { PositionCard, PositionSelectCard } from "..";
import { SelectList } from "../../components/feedback";
import { CardList } from "../../components/lists";
import { GetPositionsZone } from "../../services";
import { MULTIPLE_SELECTION_MODE } from "../../utils/constants";
import { equals } from "../../utils/objectArray";

function _selectList({
    prevPositions,
    targetGroup,
    targetScope,
    changesHandler = null,
    selectionMode = MULTIPLE_SELECTION_MODE,
    ...props
}) {
    useEffect(() => {
        // console.log("PositionSelectList", changesHandler);
    }, []);

    return (
        <SelectList
            prevItems={prevPositions}
            targetGroup={targetGroup}
            targetScope={targetScope}
            onSelectionChange={selectedItems => {
                changesHandler &&
                    changesHandler({
                        isChanged: !equals(selectedItems, prevPositions),
                        data: {
                            positions: selectedItems,
                            scope: targetScope
                        }
                    });
            }}
            selectionMode={selectionMode}
            selectionAttr="id"
            itemsComponent={
                <CardList
                    dataService={GetPositionsZone}
                    dataRequestParams={{ mode: targetGroup }}
                    cardComponent={<PositionSelectCard />}
                />
            }
        />
    );
}

export default _selectList;
