import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";

import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { RightsList, TableList } from "../../components/lists";
import { OperationTable } from "../../components/tables";
import { GetRightList } from "../../services";

import { t } from "../../utils";
import { clearTitle, setTitle, addTitle } from "../../utils/redux/navSlice";
import { RightEntry } from "../../view-components";

function _manage() {
    const rightsTableMap = {
        index: "id",
        title: "title",
        slug: "slug",
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

    return (
        <>
            <PageHeaderBar>
                <ListTitle title={t("lists.rightsListTitle")} />
            </PageHeaderBar>
            <TableList
                dataService={GetRightList}
                tableComponent={<OperationTable className="general-shadow" />}
                entryComponent={<RightEntry />}
                tableMap={rightsTableMap}
                entryOperations={entryOperations}
            />
        </>
    );
}

export default _manage;
