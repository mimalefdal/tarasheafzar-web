import React, { useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import {
    ConfirmDialog,
    DeleteDialog,
    WaitingDialog
} from "../../components/feedback";
import { ListTitle } from "../../components/list-controls";
import { CardList } from "../../components/lists";
import { t } from "../../utils";
import { DeleteDepartment, GetDepartmentsList } from "../../services";
import { DepartmentCard } from "../../view-components";
import { error } from "jquery";
import {
    EXECUTION_DONE,
    EXECUTION_DONE_FAILURE,
    EXECUTION_DONE_SUCCESS,
    WAIT_FOR_EXECUTION
} from "../../utils/constants";

function manage(props) {
    let match = useRouteMatch();
    const history = useHistory();
    const [item, setItem] = useState(null);
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [trigReload, setTrigReload] = useState(false);

    // TODO : this const been used to send item via target state
    // this fuction must been supported with renderActions function
    // the action key of a link object can be like this
    // action : showTarget

    // const showTarget = {
    //     pathname: `${match.path}/${item.slug}`,
    //     state: {
    //         item: item
    //     }
    // };

    const entryOperations = [
        {
            type: "view",
            actionType: "callback",
            action: handleShow,
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

    function handleShow(item) {
        // console.log("handle VIEW called", item);
        history.push({
            pathname: `${match.path}/${item.slug}`,
            state: {
                item: item
            }
        });
    }

    return (
        <>
            <PageHeaderBar>
                <ListTitle
                    title={t("tools.departmentsManagement")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="departments/define"
                        />
                    }
                />
            </PageHeaderBar>
            <CardList
                dataService={GetDepartmentsList}
                cardComponent={<DepartmentCard />}
                entryOperations={entryOperations}
                trigger={trigReload}
            />

            <DeleteDialog
                dataService={DeleteDepartment}
                request={deleteRequest}
                item={item}
                onClose={updateNeeded => {
                    if (updateNeeded) setTrigReload(!trigReload);
                    setDeleteRequest(false);
                    setItem({});
                }}
            />
        </>
    );
}

export default manage;
