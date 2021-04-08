import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListDisplay, ListTitle } from "../../components/list-controls";
import { CardList, RightsList, TableList } from "../../components/lists";
import { OperationTable } from "../../components/tables";
import { GetRightList } from "../../services";

import { t } from "../../utils";
import { clearTitle, setTitle, addTitle } from "../../utils/redux/navSlice";
import { RightEntry } from "../../view-components";

import ViewListIcon from "@material-ui/icons/ViewList";
import ViewStreamIcon from "@material-ui/icons/ViewStream";

function _manage() {
    const [displayMode, setDisplayMode] = useState("card");

    const rightsTableMap = {
        id: "id",
        title: "title",
        status: "activation"
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(t("tools.rightsManagement")));
        // return () => {
        //     dispatch(clearTitle());
        // };
    }, []);

    const entryOperations = [
        { type: "view", actionType: "link", action: "right/:slug/" }
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
    return (
        <>
            <PageHeaderBar>
                <ListTitle title={t("lists.rightsListTitle")} />
            </PageHeaderBar>
            <ListDisplay
                className="list-options"
                options={[
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
                ]}
                defaultOptionIndex={0}
                callback={handleDisplayMode}
            />
            {displayMode == "card" && (
                <CardList
                    dataService={GetRightList}
                    entryOperations={entryOperations}
                    dataRequestParams={{ group: "managedby" }}
                />
            )}

            {displayMode == "table" && (
                <TableList
                    dataService={GetRightList}
                    dataRequestParams={{ group: "managedby" }}
                    tableComponent={
                        <OperationTable className="general-shadow" />
                    }
                    entryComponent={<RightEntry />}
                    tableMap={rightsTableMap}
                    entryOperations={entryOperations}
                />
            )}
        </>
    );
}

export default _manage;
