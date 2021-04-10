import React, { cloneElement, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StaffContext from "../../context/staffContext";
import { ApiClient } from "../../services";
import { renderActionComponent } from "../../utils";
import { Loading } from "../feedback";
import { BasicCard } from "../cards";
import { NoItems } from "../list-controls";

_CardListBase.propTypes = {};

function _CardListBase({
    type = "basic",
    dataService,
    dataRequestParams = null,
    cardComponent = <BasicCard />,
    entryOperations = [],
    trigger = true,
    ...props
}) {
    // console.log("CardListBase", entryOperations);

    const [items, setItems] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = useContext(StaffContext).token;

    let classesByType;
    switch (type) {
        case "singleColumn":
            classesByType = "single-column";
            break;

        default:
            classesByType = "";
            break;
    }

    useEffect(() => {
        // console.log("_CardListBase->useEffect(trigger)", trigger);
        if (trigger != null) {
            setLoading(true);
            dataService(
                dataRequestParams != null && dataRequestParams,
                token,
                response => {
                    console.log(
                        "_CardListBase:[trigger]:response:",
                        response.data
                    );
                    if (response.status == 203) {
                        setEmptyMessage(response.data.message);
                    } else {
                        setEmptyMessage(null);
                        if (response.data.data) setItems(response.data.data);
                        else setItems(response.data);
                    }

                    setLoading(false);
                },
                error => {
                    console.log("_CardListBase:[trigger]:ERROR", error);
                    setLoading(false);
                }
            );
        }
    }, [trigger]);

    return (
        <div className={"flex column card-list-base " + classesByType}>
            {loading ? (
                <Loading />
            ) : !emptyMessage ? (
                items.map((item, index) => {
                    // console.log(item);
                    if (!loading) {
                        // build entryActions Here
                        var entryActions = renderActionComponent(
                            entryOperations,
                            item,
                            index
                        );
                    }
                    return cloneElement(
                        cardComponent,
                        {
                            id: item.id,
                            key: item.id,
                            item: item,
                            entryActions: entryActions,
                            entryOperations: entryOperations
                        },
                        null
                    );
                })
            ) : (
                <NoItems message={emptyMessage} />
            )}
        </div>
    );
}

export default _CardListBase;
