import React, { cloneElement, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StaffContext from "../../context/staffContext";
import { ApiClient } from "../../services";
import { renderActionComponent } from "../../utils";
import { Loading } from "../feedback";
import { BasicCard } from "../cards";
import { NoItems } from "../list-controls";
import {
    MULTIPLE_SELECTION_MODE,
    SINGLE_SELECTION_MODE
} from "../../utils/constants";
import {
    existsInArray,
    getIndexOfMatchInsideArray
} from "../../utils/findObject";

_CardListBase.propTypes = {};

function _CardListBase({
    type = "basic",
    dataService,
    dataRequestParams = null,
    cardComponent = <BasicCard />,
    entryOperations = [],
    selectionMode = null,
    trigger = true,
    ...props
}) {
    // console.log("CardListBase", entryOperations);

    const [items, setItems] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = useContext(StaffContext).token;

    const [selectedItems, setSelectedItems] = useState([]);

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
        console.log(
            "_CardListBase->useEffect(trigger)->Selection Mode:",
            selectionMode
        );
        if (trigger != null) {
            setLoading(true);
            dataService(
                dataRequestParams != null && dataRequestParams,
                token,
                response => {
                    // console.log(
                    //     "_CardListBase:[trigger]:response:",
                    //     response.data
                    // );
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

    useEffect(() => {
        console.log("selectedItems changes", selectedItems);
    }, [selectedItems]);

    function handleSelect(item) {
        // console.log("handle select called for", item);

        switch (selectionMode) {
            case SINGLE_SELECTION_MODE:
                if (existsInArray(selectedItems, "id", item.id))
                    setSelectedItems([]);
                else setSelectedItems([item]);
                break;

            case MULTIPLE_SELECTION_MODE:
                break;

            default:
                break;
        }
    }

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
                            entryOperations: entryOperations,
                            handleSelect: selectionMode
                                ? handleSelect
                                : undefined,
                            selected: existsInArray(
                                selectedItems,
                                "id",
                                item.id
                            )
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
