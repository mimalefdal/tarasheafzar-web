import React, { Component, useEffect } from "react";
import { currentLang, t, transformByPattern } from "../../utils";
import { DeleteButton, EditButton, ViewButton } from "../buttons";

function EntryBase({ item, tableMap = null, entryActions, index, ...props }) {
    // console.log("OperationEntryBase", entryActions);

    //validate and transform data from item to match tablemap keys
    let displayData = transformByPattern(tableMap, item);

    return (
        <tr
            id={props.id}
            style={{ visibility: props.collapse && "collapse" }}
            className={
                props.className + (props.expanded == true ? " expanded" : "")
            }
        >
            <td>{index}</td>
            {Object.values(displayData).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <td className="">
                <div className="table-row-btn-set">{entryActions}</div>
            </td>
        </tr>
    );
}

export default EntryBase;
