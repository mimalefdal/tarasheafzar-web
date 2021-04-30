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
            selectionMode={MULTIPLE_NESTED_SELECTION_MODE}
            itemsComponent={
                <ExpandableCardList
                    dataService={GetRightList}
                    dataRequestParams={{ group: targetGroup }}
                    cardComponent={<RightManageCard />}
                    // entryOperations={[]}
                />
            }
        />
    );
}

export default _selectList;
