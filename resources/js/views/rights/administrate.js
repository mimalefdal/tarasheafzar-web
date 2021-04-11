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
import { SINGLE_SELECTION_MODE } from "../../utils/constants";

function _administrate() {
    const [displayMode, setDisplayMode] = useState("card");
    const [expandedItems, setExpandedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

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

    function handleDisplayMode(mode) {
        console.log("handleDisplayMode called with ", mode);
        setDisplayMode(mode.value);
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

    function handleSelect(item) {
        console.log("handle select called for", item);

        switch (selectionMode) {
            case SINGLE_SELECTION_MODE:
                if (existsInArray(selectedItems, "id", item.id))
                    setSelectedItems([]);
                else setSelectedItems([item]);
                break;

            case MULTIPLE_SELECTION_MODE:
                break;

            default:
                break;
        }
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
                    cardComponent={<RightManageCard />}
                    entryOperations={entryOperations}
                    selectionMode={SINGLE_SELECTION_MODE}
                    expansion={{
                        handler: handleExpand,
                        data: expandedItems,
                        expandableItemsField: "childs",
                        className: "card-operation-btn"
                    }}
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
                        <RightEntry entryOperations={entryOperations} />
                    }
                    tableMap={rightsTableMap}
                    entryOperations={entryOperations}
                />
            )}
        </>
    );
}

export default _administrate;
