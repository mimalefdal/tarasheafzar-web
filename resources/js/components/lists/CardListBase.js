import React, { cloneElement, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StaffContext from "../../context/staffContext";
import { ApiClient } from "../../services";
import { renderActionComponent } from "../../utils";
import { Loading } from "../feedback";
import { BasicCard } from "../cards";
import { NoItems } from "../list-controls";

CardListBase.propTypes = {};

function CardListBase({
    type = "basic",
    dataService,
    cardComponent = <BasicCard />,
    entryOperations,
    trigger,
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
        // console.log("CardListBase->useEffect(trigger)", trigger);
        setLoading(true);
        dataService(
            token,
            response => {
                // console.log("CardListBase:[trigger]:response:", response);
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
                console.log("CardListBase:[trigger]:ERROR", error);
                setLoading(false);
            }
        );
    }, [trigger]);

    return (
        <div
            className={
                "flex column vertical-center card-list-base " + classesByType
            }
        >
            {loading ? (
                <Loading />
            ) : !emptyMessage ? (
                items.map((item, index) => {
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
                            key: item.id,
                            item: item,
                            entryActions: entryActions
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

export default CardListBase;
