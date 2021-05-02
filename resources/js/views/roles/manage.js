import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PageHeaderBar } from "../../components";
import { GuardedAction } from "../../components/buttons";
import { DeleteDialog } from "../../components/feedback";
import { ListTitle } from "../../components/list-controls";
import { CardList } from "../../components/lists";
import { DeleteRole, GetRoleList } from "../../services";
import { t } from "../../utils";
import { setTitle } from "../../utils/redux/navSlice";

function _manage() {
    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [reload, trigReload] = useState(false);

    useEffect(() => {
        dispatch(setTitle(t("tools.rolesManagement")));
    }, []);

    const entryOperations = [
        {
            type: "view",
            actionType: "link",
            action: "role/:slug",
            props: { className: "card-operation-btn" }
        },
        {
            type: "delete",
            actionType: "callback",
            action: handleDelete,
            props: { className: "card-operation-btn" }
        }
    ];

    function handleDelete(item) {
        // console.log("handle DELETE called", item);
        setItem(item);
        setDeleteRequest(true);
    }

    return (
        <>
            <PageHeaderBar>
                <ListTitle
                    title={t("lists.rolesListTitle")}
                    btnSet={
                        <>
                            <GuardedAction
                                action="add"
                                feature="add-role-operation"
                                className="header-operation-btn"
                                target="role/define"
                            />
                        </>
                    }
                />
            </PageHeaderBar>
            <CardList
                dataService={GetRoleList}
                // dataRequestParams={{ group: "managedby" }}
                entryOperations={entryOperations}
                // cardComponent={<RightManageCard />}
                trigger={reload}
            />
            <DeleteDialog
                dataService={DeleteRole}
                request={deleteRequest}
                item={item}
                onClose={updateNeeded => {
                    if (updateNeeded) trigReload(!reload);
                    setDeleteRequest(false);
                    setItem({});
                }}
            />
        </>
    );
}

export default _manage;
