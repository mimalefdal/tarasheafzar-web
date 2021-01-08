import React, { useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { BranchCard } from "../../view-components";
import { ConfirmDialog } from "../../components/feedback";
import { ListTitle } from "../../components/list-controls";
import { BranchsList, CardList } from "../../components/lists";
import StaffContext from "../../context/staffContext";
import { ApiClient, DeleteBranch } from "../../services";
import { t } from "../../utils";

function manageBranchs(props) {
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
        console.log("handle DELETE called", item);
        setItem(item);
        setAskToConfirm(true);
    }

    function handleShow(item) {
        console.log("handle VIEW called", item);

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
            DeleteBranch(item, token, deleted);
        }
    }

    function deleted(response) {
        console.log(response);
        history.replace(history.location.pathname);
    }

    return (
        <>
            <PageHeaderBar>
                <ListTitle
                    title={t("tools.branchsManagement")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="branchs/define"
                        />
                    }
                />
            </PageHeaderBar>
            <CardList
                dataUrl="/branches"
                cardComponent={<BranchCard />}
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

export default manageBranchs;
