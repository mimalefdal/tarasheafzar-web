import React, { useEffect, useState } from "react";
import { CardList, ExpandableCardList } from "../../components/lists";
import { GetRightList } from "../../services";
import { RightManageCard } from "..";

import { SelectList } from "../../components/feedback";
import { MULTIPLE_NESTED_SELECTION_MODE } from "../../utils/constants";
import { equals } from "../../utils/objectArray";

function _selectList({
    prevRights,
    targetGroup,
    targetScope,
    changesHandler = null,
    selectionMode = MULTIPLE_NESTED_SELECTION_MODE,
    ...props
}) {
    useEffect(() => {
        // console.log("RightSelectList", changesHandler);
    }, []);

    return (
        <SelectList
            prevItems={prevRights}
            targetGroup={targetGroup}
            targetScope={targetScope}
            onSelectionChange={selectedItems => {
                changesHandler &&
                    changesHandler({
                        isChanged: !equals(selectedItems, prevRights),
                        data: {
                            rights: selectedItems,
                            scope: targetScope
                        }
                    });
            }}
            selectionMode={selectionMode}
            selectionAttr="id"
            itemsComponent={
                <ExpandableCardList
                    dataService={GetRightList}
                    dataRequestParams={{ group: targetGroup }}
                    cardComponent={<RightManageCard />}
                    expansionAttr="slug"
                />
            }
        />
    );
}

export default _selectList;
