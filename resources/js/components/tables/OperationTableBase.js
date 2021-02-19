import React, { cloneElement, Fragment, useEffect, useState } from "react";
import { renderActionComponent, t } from "../../utils";
import "../../styles/tables.css";
import { LodingTableItems } from "../table-controls";
import { OperationEntry, RightEntry } from ".";
import { EditButton, ViewButton, DeleteButton } from "../buttons";

function Table({ items, entryComponent, tableMap, entryOperations, ...props }) {
    const [loading, setLoading] = useState(props.loading);
    let entryComponents;
    // set default entry component
    if (entryComponent == null) entryComponent = <OperationEntry />;

    useEffect(() => {
        // console.log("OperatinTableBase", entryOperations);

        setLoading(props.loading);
    }, [props.loading]);

    return (
        <table className={props.className}>
            <thead>
                <tr>
                    {Object.keys(tableMap).map(key => (
                        <th key={key}> {t("labels." + key)} </th>
                    ))}

                    <th className="operations"></th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <LodingTableItems columns={items.size} />
                ) : (
                    items.map((item, index) => {
                        if (props.loading == false) {
                            // build entryActions Here
                            var entryActions = renderActionComponent(
                                entryOperations,
                                item,
                                index
                            );
                        }
                        return cloneElement(
                            entryComponent,
                            {
                                item: item,
                                key: index,
                                tableMap: tableMap,
                                entryActions: entryActions
                            },
                            null
                        );
                    })
                )}
            </tbody>
        </table>
    );
}

export default Table;
