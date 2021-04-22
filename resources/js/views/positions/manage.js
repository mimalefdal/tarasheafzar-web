import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { DeleteDialog } from "../../components/feedback";
import { ListFilter, ListTitle } from "../../components/list-controls";
import { CardList } from "../../components/lists";
import {
    DeletePosition,
    GetPositionsList,
    GetPositionsZone
} from "../../services";
import { t } from "../../utils";
import { PositionCard } from "../../view-components";

function ManagePositions(props) {
    let match = useRouteMatch();
    const history = useHistory();
    const [item, setItem] = useState(null);
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [trigReload, setTrigReload] = useState(false);

    const [dataParams, setDataParams] = useState({
        mode: "all",
        sortBy: "joblevel_priority"
    });

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

    function handleFilter(info) {
        // console.log("handleFilter called", info);
        setDataParams({
            ...dataParams,
            mode: info.value
        });
        setTrigReload(!trigReload);
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
            <CardList
                dataService={GetPositionsZone}
                dataRequestParams={dataParams}
                cardComponent={<PositionCard />}
                entryOperations={entryOperations}
                trigger={trigReload}
            />
            <DeleteDialog
                dataService={DeletePosition}
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

export default ManagePositions;
