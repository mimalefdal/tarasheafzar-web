import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { CardList } from "../../components/lists";
import { GetPositionsList } from "../../services";
import { t } from "../../utils";
import { PositionCard } from "../../view-components";

function ManagePositions(props) {
    let match = useRouteMatch();
    const history = useHistory();
    const [trigReload, setTrigReload] = useState(false);

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
        console.log("handle VIEW called", item);
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
                    title={t("tools.positionsManagement")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="positions/define"
                        />
                    }
                />
            </PageHeaderBar>
            <CardList
                dataService={GetPositionsList}
                cardComponent={<PositionCard />}
                entryOperations={entryOperations}
                trigger={trigReload}
            />
        </>
    );
}

export default ManagePositions;
