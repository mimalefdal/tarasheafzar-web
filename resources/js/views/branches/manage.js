import React, { useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { BranchCard } from "../../view-components";
import { ListTitle } from "../../components/list-controls";
import { BranchsList, CardList } from "../../components/lists";
import StaffContext from "../../context/staffContext";
import { DeleteBranch, GetBranchsList } from "../../services";
import { t } from "../../utils";
import { DeleteDialog } from "../../components/feedback";

function manageBranchs(props) {
    let match = useRouteMatch();
    const history = useHistory();
    const [item, setItem] = useState({});
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
                    title={t("tools.branchesManagement")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="branches/define"
                        />
                    }
                />
            </PageHeaderBar>
            <CardList
                dataService={GetBranchsList}
                cardComponent={<BranchCard />}
                entryOperations={entryOperations}
                trigger={trigReload}
            />

            <DeleteDialog
                dataService={DeleteBranch}
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

export default manageBranchs;
