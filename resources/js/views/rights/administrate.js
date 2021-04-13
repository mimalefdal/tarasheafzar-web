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
import {
    MULTIPLE_SELECTION_MODE,
    MULTIPLE_NESTED_SELECTION_MODE,
    SINGLE_SELECTION_MODE,
    SINGLE_NESTED_SELECTION_MODE
} from "../../utils/constants";
import { existsInArray, removeFromArray } from "../../utils/objectArray";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";

function _administrate() {
    const [displayMode, setDisplayMode] = useState("card");
    const [expandedItems, setExpandedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectionMode, setSelectionMode] = useState(
        MULTIPLE_NESTED_SELECTION_MODE
    );

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
        console.log("handle EXPAND called", item);
        if (existsInArray(expandedItems, "id", item.id))
            setExpandedItems(
                // expandedItems.filter(value => item.id != value.id)
                removeFromArray(expandedItems, "id", [item.id])
            );
        else {
            setExpandedItems([...expandedItems, item]);
            // setExpandedItems([item.id]);
        }
    }

    function handleSelect(item) {
        // console.log("handle select called for", item);

        function getChildAttrOf(item, attr, childAttr = "childs") {
            if (!item[childAttr]) return [];

            return item[childAttr].map(child => {
                return child[attr];
            });
        }

        function getDeepChildAttrOf(item, attr, childAttr = "childs") {
            let deepAttrs = [...getChildAttrOf(item, attr, childAttr)];

            item[childAttr].map(child => {
                let deeperChildAttr = getDeepChildAttrOf(child, attr);
                if (deeperChildAttr.length != 0) {
                    deepAttrs = [...deepAttrs, ...deeperChildAttr];
                }
            });

            return deepAttrs;
        }

        function getDeepChildsOf(item, childAttr = "childs") {
            // console.log("getDeepChildsOf()->childAttr", childAttr);

            let deepChilds = [...item[childAttr]];
            // console.log("getDeepChildsOf()->childs", item.title, childs);

            deepChilds.map(child => {
                let deeperChilds = getDeepChildsOf(child);
                if (deeperChilds.length != 0) {
                    deepChilds = [...deepChilds, ...deeperChilds];
                }
            });

            return deepChilds;
        }

        switch (selectionMode) {
            case SINGLE_SELECTION_MODE:
                if (existsInArray(selectedItems, "id", item.id))
                    setSelectedItems([]);
                else setSelectedItems([item]);
                break;

            case MULTIPLE_SELECTION_MODE:
                if (existsInArray(selectedItems, "id", item.id))
                    setSelectedItems(
                        selectedItems.filter(value => item.id != value.id)
                    );
                else setSelectedItems([...selectedItems, item]);
                break;

            case SINGLE_NESTED_SELECTION_MODE:
            case MULTIPLE_NESTED_SELECTION_MODE:
                if (existsInArray(selectedItems, "id", item.id)) {
                    // handle deselect
                    if (item.hasOwnProperty("parent")) {
                    } else {
                    }

                    if (item.childs) {
                        let childIds = getDeepChildAttrOf(item, "id");
                        console.log("deselect childIds", childIds);
                        setSelectedItems(
                            removeFromArray(selectedItems, "id", [
                                item.id,
                                ...childIds
                            ])
                        );
                    } else
                        setSelectedItems(
                            removeFromArray(selectedItems, "id", [item.id])
                        );
                } else {
                    // handle select
                    let itemsToAdd = [item];
                    if (item.hasOwnProperty("parent")) {
                        if (
                            !existsInArray(selectedItems, "id", item.parent.id)
                        ) {
                            itemsToAdd = [...itemsToAdd, item.parent];
                        }
                    }

                    if (item.hasOwnProperty("childs")) {
                        itemsToAdd = [...itemsToAdd, ...getDeepChildsOf(item)];
                    }

                    switch (selectionMode) {
                        case SINGLE_NESTED_SELECTION_MODE:
                            setSelectedItems([...itemsToAdd]);
                            break;

                        case MULTIPLE_NESTED_SELECTION_MODE:
                            setSelectedItems([...selectedItems, ...itemsToAdd]);
                            break;

                        default:
                            break;
                    }
                }
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
                    selection={{
                        handler: handleSelect,
                        data: selectedItems,
                        className: ""
                    }}
                    expansion={{
                        handler: handleExpand,
                        data: expandedItems,
                        expandableItemsField: "childs",
                        className: "card-operation-btn",
                        icon: <MenuIcon />
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
