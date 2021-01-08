import React, { Component } from "react";
import { OperationEntry } from "..";
import { currentLang, t } from "../../../utils";
import { EditButton, DeleteButton, ViewButton } from "../../buttons";

function Entry({ item, entryActions, ...props }) {
    //transform item data to displayable format
    let activation;
    if (item.activation) {
        activation = t("labels.active");
    } else {
        activation = t("labels.deactive");
    }
    const id = item.id;
    const slug = item.slug;
    const title = JSON.parse(item.title)[currentLang()];

    const displayItem = {
        title: title,
        index: id,
        slug: slug,
        status: activation
    };

    return (
        <OperationEntry
            item={displayItem}
            entryActions={entryActions}
            tableMap={props.tableMap}
        />
    );
}

export default Entry;
