import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { TableList } from "../../components/lists";
import { OperationEntry, OperationTable } from "../../components/tables";
import { t } from "../../utils";
import { StaffEntry } from "../../view-components";

function Manage(props) {
    const staffTableMap = {
        index: "id",
        personnel_id: "personnel_id",
        name: "name",
        position: "position",
        depunit: ""
    };

    const entryOperations = [
        { type: "view", actionType: "link", action: "staff/:username" },
        { type: "edit", actionType: "callback", action: handleEdit },
        { type: "delete", actionType: "callback", action: handleDelete }
    ];

    function handleDelete(item) {
        console.log("staff DELETE called", item);
    }

    function handleEdit(item) {
        console.log("staff EDIT called", item);
    }

    return (
        <div className="page-content">
            <PageHeaderBar>
                <ListTitle
                    title={t("custum-titles.staffListTitle")}
                    btnSet={null}
                />
            </PageHeaderBar>
            <TableList
                dataUrl="/staff"
                tableComponent={<OperationTable className="general-shadow" />}
                entryComponent={<StaffEntry />}
                tableMap={staffTableMap}
                entryOperations={entryOperations}
            />
        </div>
    );
}

export default Manage;
