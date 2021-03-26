import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { GuardedAction } from "../../components/buttons";
import { ConfirmAndRunDialog, DeleteDialog } from "../../components/feedback";
import { ListTitle } from "../../components/list-controls";
import { TableList } from "../../components/lists";
import { OperationEntry, OperationTable } from "../../components/tables";
import { DeleteStaff, GetStaffList, ToggleSuspendStaff } from "../../services";
import { t } from "../../utils";
import { StaffEntry } from "../../view-components";

function _list(props) {
    let match = useRouteMatch();
    const history = useHistory();

    const [item, setItem] = useState(null);
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [suspendRequest, setSuspendRequest] = useState(false);
    const [trigReload, setTrigReload] = useState(false);

    const staffTableMap = {
        index: "id",
        personnel_id: "personnel_id",
        name: "name",
        position: "position",
        block: null
    };

    const entryOperations = [
        { type: "view", actionType: "link", action: "/staff/:personnel_id" },
        {
            type: "edit",
            requiredRight: "edit-staff",
            actionType: "callback",
            action: handleEdit
        },
        {
            type: "suspendToggle",
            requiredRight: ["suspend-staff"],
            actionType: "callback",
            action: handleSuspend
        },
        {
            type: "delete",
            requiredRight: ["delete-staff"],
            actionType: "callback",
            action: handleDelete
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

    return (
        <div className="">
            <PageHeaderBar>
                <ListTitle
                    title={t("lists.staffListTitle")}
                    btnSet={
                        <>
                            <GuardedAction
                                action="add"
                                requiredRights="create-staff"
                                className="header-operation-btn"
                                target="/staff/define"
                            />
                        </>
                    }
                    // options={
                    //     <>
                    //         <p className="list-option">حوزه عملیاتی</p>
                    //         <p className="list-option">همه</p>
                    //         <p className="list-option">فعال</p>
                    //     </>
                    // }
                />
            </PageHeaderBar>
            <TableList
                dataService={GetStaffList}
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
                confirmMassageAction={t("expressions.sureToggle")}
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

export default _list;
