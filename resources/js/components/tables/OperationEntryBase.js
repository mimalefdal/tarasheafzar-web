import React, { Component, useEffect } from "react";
import { currentLang, t, transformByPattern } from "../../utils";
import { DeleteButton, EditButton, ViewButton } from "../buttons";

function EntryBase({ item, tableMap = null, entryActions, ...props }) {
    //validate and transform data from item to match tablemap keys
    let displayData = transformByPattern(tableMap, item);

    return (
        <tr className="">
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
