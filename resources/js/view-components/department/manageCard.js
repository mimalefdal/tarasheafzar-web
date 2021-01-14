import React from "react";
import { BasicCard } from "../../components/cards";

function Card({ item, entryActions, ...props }) {
    // console.log("DepartmentCard", item);
    let localTitleCompliment = item.branch
        ? item.branch.type + " " + item.branch.title
        : "شرکت";

    let globalTitleCompliment = item.branch
        ? "Of " + item.branch.title_en + " " + item.branch.type_en + " "
        : "Of Company";

    return (
        <BasicCard
            item={item}
            entryActions={entryActions}
            title_complements_local={localTitleCompliment}
            title_complements_global={globalTitleCompliment}
        >
            <div
                style={{
                    height: "100%",
                    background: "lightcoral",
                    color: "white",
                    opacity: 0.3
                }}
            ></div>
        </BasicCard>
    );
}

export default Card;
