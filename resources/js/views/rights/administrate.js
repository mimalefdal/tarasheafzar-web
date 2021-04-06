import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { RightsList, TableList } from "../../components/lists";
import { OperationTable } from "../../components/tables";
import { GetRightList } from "../../services";

import { t } from "../../utils";
import { addTitle, clearTitle, setTitle } from "../../utils/redux/navSlice";
import { RightEntry } from "../../view-components";

function _manage() {
    const [expandedItems, setExpandedItems] = useState([]);

    const rightsTableMap = {
        id: "id",
        title: "title",
        // slug: "slug",
        status: "activation"
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(t("tools.rightsAdministration")));
        // return () => {
        //     dispatch(clearTitle());
        // };
    }, []);

    const entryOperations = [
        { type: "view", actionType: "link", action: "right/:id" },
        {
            type: "expand",
            actionType: "callback",
            action: handleExpand,
            props: {
                expanded: expandedItems,
                offset: -300
            },
            subsetField: "childs"
        }
        // { type: "edit", actionType: "callback", action: handleEdit },
    ];

    function handleDelete(item) {
        console.log("handle DELETE called", item);
    }

    function handleEdit(item) {
        console.log("handle EDIT called", item);
    }

    function handleExpand(item) {
        // console.log("handle EXPAND called", item);
        if (expandedItems.indexOf(item.id) == -1)
            setExpandedItems([...expandedItems, item.id]);
        // setExpandedItems([item.id]);
        else {
            setExpandedItems(expandedItems.filter(value => item.id != value));
        }
    }

    return (
        <>
            <PageHeaderBar>
                <ListTitle title={t("lists.rightsListTitle")} />
            </PageHeaderBar>
            <TableList
                dataService={GetRightList}
                dataRequestParams={{ group: "owned" }}
                // dataDisplayCondition={{ field: "parent_id", value: null }}
                tableComponent={<OperationTable className="general-shadow" />}
                entryComponent={
                    <RightEntry
                        expandedItems={expandedItems}
                        entryOperations={entryOperations}
                    />
                }
                tableMap={rightsTableMap}
                entryOperations={entryOperations}
            />
        </>
    );
}

export default _manage;
