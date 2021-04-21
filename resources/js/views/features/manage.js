import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { CardList } from "../../components/lists";
import { GetFeaturesList } from "../../services";
import { t } from "../../utils";
import { clearTitle, setTitle } from "../../utils/redux/navSlice";
import { FeatureCard } from "../../view-components";
import { NewPage } from "../errors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function _manage(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle(t("tools.featuresManagement")));
        // return () => {
        //     dispatch(clearTitle());
        // };
    }, []);

    const [expandedItems, setExpandedItems] = useState([]);

    const entryOperations = [
        {
            type: "view",
            actionType: "callback",
            action: handleShow,
            props: { className: "card-operation-btn" }
        }
    ];

    function handleShow(item) {
        console.log("manageCard:handleShow()");
    }

    function handleExpand(item) {
        if (expandedItems.indexOf(item.id) == -1)
            // setExpandedItems([...expandedItems, item.id]);
            setExpandedItems([item.id]);
        else {
            setExpandedItems(expandedItems.filter(value => item.id != value));
        }
    }
    return (
        <>
            <PageHeaderBar>
                <ListTitle title={t("tools.featuresManagement")} />
            </PageHeaderBar>
            <CardList
                dataService={GetFeaturesList}
                cardComponent={<FeatureCard expandedItems={expandedItems} />}
                entryOperations={entryOperations}
                // trigger={trigReload}
                expansion={{
                    handler: handleExpand,
                    data: expandedItems,
                    expandableItemsField: "childs",
                    className: "card-operation-btn",
                    icon: <ExpandMoreIcon />
                }}
            />
        </>
    );
}

export default _manage;
