import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton, GuardedAction } from "../../components/buttons";
import { ConfirmAndRunDialog, DeleteDialog } from "../../components/feedback";
import { ListFilter, ListTitle } from "../../components/list-controls";
import { TableList } from "../../components/lists";
import { OperationEntry, OperationTable } from "../../components/tables";
import {
    DeleteStaff,
    GetCrewScope,
    GetStaffList,
    ToggleSuspendStaff
} from "../../services";
import { t } from "../../utils";
import { StaffEntry } from "../../view-components";

function _manage(props) {
    let match = useRouteMatch();
    const history = useHistory();

    const [item, setItem] = useState(null);
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [suspendRequest, setSuspendRequest] = useState(false);
    const [trigReload, setTrigReload] = useState(false);

    const [dataParams, setDataParams] = useState({
        mode: "all",
        sortBy: "joblevel_priority"
    });

    const staffTableMap = {
        id: "id",
        personnel_id: "personnel_id",
        name: "name",
        position: "position",
        block: null
    };

    const entryOperations = [
        {
            type: "view",
            actionType: "link",
            action: "/staff/:personnel_id",
            feature: "view-staff-operation"
        },
        {
            type: "edit",
            actionType: "callback",
            action: handleEdit,
            feature: "edit-staff-operation"
        },
        {
            type: "suspendToggle",
            actionType: "callback",
            action: handleSuspend,
            feature: "suspend-staff-operation"
        },
        {
            type: "delete",
            actionType: "callback",
            action: handleDelete,
            feature: "delete-staff-operation"
        }
    ];

    function handleDelete(item) {
        // console.log("staff DELETE called", item);
        setItem(item);
        setDeleteRequest(true);
    }

    function handleEdit(item) {
        // console.log("staff EDIT called", item);
        history.push({
            pathname: `/staff/edit/${item.personnel_id}`,
            state: {
                item: item
            }
        });
    }

    function handleSuspend(item) {
        // console.log("handle SUSPEND called", item);
        setItem(item);
        setSuspendRequest(true);
    }
    function handleFilter(info) {
        console.log("handleFilter called", info);
        setDataParams({
            ...dataParams,
            mode: info.value
        });
        setTrigReload(!trigReload);
    }

    return (
        <div className="">
            <PageHeaderBar>
                <ListTitle
                    title={t("tools.staffManagement")}
                    btnSet={
                        <>
                            <GuardedAction
                                action="add"
                                feature="add-staff-operation"
                                className="header-operation-btn"
                                target="/staff/define"
                            />
                        </>
                    }
                    // options={<></>}
                />
            </PageHeaderBar>
            <ListFilter
                className="table-filter"
                options={[
                    { value: "direct", label: t("filters.direct") },
                    { value: "subset", label: t("filters.subsets") },
                    { value: "all", label: t("filters.all") }
                ]}
                defaultOptionIndex={2}
                callback={handleFilter}
            />
            <TableList
                dataService={GetCrewScope}
                dataRequestParams={dataParams}
                tableComponent={<OperationTable className="" />}
                entryComponent={<StaffEntry />}
                tableMap={staffTableMap}
                entryOperations={entryOperations}
                trigger={trigReload}
            />
            <DeleteDialog
                dataService={DeleteStaff}
                request={deleteRequest}
                item={item}
                confirmMessageData={item && item.fullname}
                confirmPreContent={t("attr.staffAccount")}
                onClose={updateNeeded => {
                    if (updateNeeded) setTrigReload(!trigReload);
                    setDeleteRequest(false);
                    setItem({});
                }}
            />
            <ConfirmAndRunDialog
                dataService={ToggleSuspendStaff}
                request={suspendRequest}
                item={item}
                confirmMessageAction={t("expressions.sureToggle")}
                confirmMessageData={item && item.fullname}
                confirmPreContent={
                    t("labels.status") + " " + t("attr.staffAccount")
                }
                // runProgressMessage={t("expressions.executed")}
                onClose={updateNeeded => {
                    if (updateNeeded) setTrigReload(!trigReload);
                    setSuspendRequest(false);
                    setItem({});
                }}
            />
        </div>
    );
}

export default _manage;
