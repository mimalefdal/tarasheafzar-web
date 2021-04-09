import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListDisplayMode, ListTitle } from "../../components/list-controls";
import { CardList, RightsList, TableList } from "../../components/lists";
import { OperationTable } from "../../components/tables";
import { GetRightList } from "../../services";

import { t } from "../../utils";
import { addTitle, clearTitle, setTitle } from "../../utils/redux/navSlice";
import { RightEntry, RightManageCard } from "../../view-components";

import ViewListIcon from "@material-ui/icons/ViewList";
import ViewStreamIcon from "@material-ui/icons/ViewStream";

function _manage() {
    const [expandedItems, setExpandedItems] = useState([]);
    const [displayMode, setDisplayMode] = useState("card");

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
        {
            type: "expand",
            actionType: "callback",
            action: handleExpand,
            props: {
                expanded: expandedItems,
                offset: -200,
                className: "card-operation-btn"
            },
            subsetField: "childs"
        },
        {
            type: "view",
            actionType: "link",
            action: "right/:id",
            props: { className: "card-operation-btn" }
        }
        // { type: "edit", actionType: "callback", action: handleEdit },
    ];

    const displayModes = [
        {
            value: "card",
            label: t("display.card"),
            icon: <ViewStreamIcon />
        },
        {
            value: "table",
            label: t("display.table"),
            icon: <ViewListIcon />
        }
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

    function handleDisplayMode(mode) {
        console.log("handleDisplayMode called with ", mode);
        setDisplayMode(mode.value);
    }

    return (
        <>
            <PageHeaderBar>
                <ListTitle title={t("lists.rightsListTitle")} />
            </PageHeaderBar>
            <ListDisplayMode
                className="list-options"
                options={displayModes}
                callback={handleDisplayMode}
            />

            {displayMode == "card" && (
                <CardList
                    dataService={GetRightList}
                    dataRequestParams={{ group: "owned" }}
                    cardComponent={
                        <RightManageCard expandedItems={expandedItems} />
                    }
                    entryOperations={entryOperations}
                />
            )}

            {displayMode == "table" && (
                <TableList
                    dataService={GetRightList}
                    dataRequestParams={{ group: "owned" }}
                    // dataDisplayCondition={{ field: "parent_id", value: null }}
                    tableComponent={
                        <OperationTable className="general-shadow" />
                    }
                    entryComponent={
                        <RightEntry
                            expandedItems={expandedItems}
                            entryOperations={entryOperations}
                        />
                    }
                    tableMap={rightsTableMap}
                    entryOperations={entryOperations}
                />
            )}
        </>
    );
}

export default _manage;
