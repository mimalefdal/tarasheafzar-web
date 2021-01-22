import React, { cloneElement, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StaffContext from "../../context/staffContext";
import { ApiClient } from "../../services";
import { renderActionComponent } from "../../utils";
import { Loading } from "../feedback";

CardListBase.propTypes = {};

function CardListBase({
    type = "basic",
    dataService,
    cardComponent,
    entryOperations,
    trigger,
    ...props
}) {
    // console.log("CardListBase", entryOperations);

    const [items, setItems] = useState([]);
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
                console.log(
                    "CardListBase->useEffect(dataService)->response",
                    response.data
                );
                if (response.data.data) setItems(response.data.data);
                else setItems(response.data);
                setLoading(false);
            },
            error => {
                console.log(
                    "CardListBase->useEffect(dataService)->ERROR",
                    error
                );
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
            ) : (
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
            )}
        </div>
    );
}

export default CardListBase;
