import React from "react";
import { EditButton, DeleteButton, ViewButton } from "../../components/buttons";
import { OperationEntry } from "../../components/tables";
import { currentLang, t } from "../../utils";

function Entry({ item, entryActions, ...props }) {
    // console.log(item);
    //transform item data to displayable format

    let titles;
    // if (item.position_id != null) titles = JSON.parse(item.position.title);
    if (item.position_id != null) titles = item.position.title;

    const id = item.id;
    const personnel_id = item.personnel_id;

    const name = item.firstname + " " + item.lastname;
    const position = item.position_id && titles[currentLang()];

    const displayItem = {
        index: id,
        personnel_id: personnel_id,
        name: name,
        position: position
    };
    return (
        <OperationEntry
            item={displayItem}
            entryActions={entryActions}
            tableMap={props.tableMap}
        />
    );
}

export default Entry;
