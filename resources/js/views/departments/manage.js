import React, { useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ConfirmDialog } from "../../components/feedback";
import { ListTitle } from "../../components/list-controls";
import { CardList } from "../../components/lists";
import StaffContext from "../../context/staffContext";
import { t } from "../../utils";
import { DeleteDepartment, GetDepartmentsList } from "../../services";
import { BranchCard, DepartmentCard } from "../../view-components";
import { error } from "jquery";

function ManageDepartments(props) {
    let match = useRouteMatch();
    const history = useHistory();
    const token = useContext(StaffContext).token;
    let [askToConfirm, setAskToConfirm] = useState(false);
    let [item, setItem] = useState({});

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
        setAskToConfirm(true);
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

    function onDelete(confirm) {
        setAskToConfirm(false);
        if (confirm) {
            DeleteDepartment(
                item,
                token,
                response => {
                    console.log(response);
                    history.replace(history.location.pathname);
                },
                error => {
                    console.log(error);
                }
            );
        }
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
            />

            <ConfirmDialog
                show={askToConfirm}
                onClose={onDelete}
                title={t("alerts.confirm")}
                content={t("expressions.sureDelete")}
                item={item.type + " " + item.title}
            />
        </>
    );
}

export default ManageDepartments;
