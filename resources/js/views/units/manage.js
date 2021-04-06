import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { BasicCard } from "../../components/cards";
import { DeleteDialog } from "../../components/feedback";
import { ListTitle } from "../../components/list-controls";
import { CardList } from "../../components/lists";
import { DeleteUnit, GetUnitsList } from "../../services";
import { t } from "../../utils";
import { UnitCard } from "../../view-components";

function ManageUnits(props) {
    let match = useRouteMatch();
    const history = useHistory();
    const [item, setItem] = useState(null);
    const [deleteRequest, setDeleteRequest] = useState(false);
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
        // console.log("handle VIEW called", item);
        history.push({
            pathname: `${match.path}/${item.id}`,
            state: {
                item: item
            }
        });
    }
    return (
        <>
            <PageHeaderBar>
                <ListTitle
                    title={t("tools.unitsManagement")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="units/define"
                        />
                    }
                />
            </PageHeaderBar>
            <CardList
                dataService={GetUnitsList}
                cardComponent={<UnitCard />}
                entryOperations={entryOperations}
                trigger={trigReload}
            />

            <DeleteDialog
                dataService={DeleteUnit}
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

export default ManageUnits;
