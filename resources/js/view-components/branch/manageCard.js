import React from "react";
import { BasicCard } from "../../components/cards";

function Card({ item, entryActions, ...props }) {
    // console.log("BranchCard", entryActions);
    return (
        <BasicCard item={item} entryActions={entryActions}>
            <div className="card-info-box"></div>
        </BasicCard>
    );
}

export default Card;
