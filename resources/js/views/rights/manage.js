import React, { Component } from "react";

import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { RightsList, TableList } from "../../components/lists";
import { OperationTable } from "../../components/tables";
import { GetRightList } from "../../services";

import { t } from "../../utils";
import { RightEntry } from "../../view-components";

function ManageRights() {
    const rightsTableMap = {
        index: "id",
        title: "title",
        slug: "slug",
        status: "activation"
    };

    const entryOperations = [
        { type: "view", actionType: "link", action: "right/:slug/" },
        { type: "edit", actionType: "callback", action: handleEdit },
        { type: "delete", actionType: "callback", action: handleDelete }
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
                <ListTitle
                    title={t("custum-titles.rightsListTitle")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="right/add"
                        />
                    }
                />
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

export default ManageRights;
