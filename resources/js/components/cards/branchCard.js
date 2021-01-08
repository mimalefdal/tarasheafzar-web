import React from "react";
import { BasicCard } from ".";

function Card({ item, entryActions, ...props }) {
    // console.log("BranchCard", entryActions);
    return (
        <BasicCard item={item} entryActions={entryActions}>
            {/* <div style={{ height: "100%", background: "#ddd", color: "white" }}>
                Additional information shows here
            </div> */}
        </BasicCard>
    );
}

export default Card;
