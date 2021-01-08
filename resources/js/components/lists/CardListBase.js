import React, { cloneElement, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StaffContext from "../../context/staffContext";
import { ApiClient } from "../../services";
import { FormLoadingData } from "../form-controls";
import { renderActionComponent } from "../../utils";

CardListBase.propTypes = {};

function CardListBase({
    type = "basic",
    dataUrl,
    cardComponent,
    entryOperations,
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
        // console.log(apiHeaders);
        ApiClient.get(dataUrl, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                // console.log("CardlistBase", response);
                if (response.data.data) setItems(response.data.data);
                else setItems(response.data);

                setLoading(false);
            })
            .catch(error => {
                console.log(error.response);
                setLoading(false);
            });
    }, []);

    return (
        <div className={"card-list-base " + classesByType}>
            {loading ? (
                <FormLoadingData />
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
