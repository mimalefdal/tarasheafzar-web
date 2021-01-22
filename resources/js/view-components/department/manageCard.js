import React, { useContext } from "react";
import { BasicCard } from "../../components/cards";
import AppContext from "../../context/appContext";

function Card({ item, entryActions, ...props }) {
    // console.log("DepartmentCard", item);
    const locale = useContext(AppContext).locale;

    let localTitleCompliment = "TODO";
    if (item.holder) {
        localTitleCompliment = item.holder.full_title
            ? item.holder.full_title
            : item.holder.title[locale];
    }

    let globalTitleCompliment = item.holder;
    if (item.holder) {
        globalTitleCompliment = item.holder.full_title_en
            ? item.holder.full_title_en
            : item.holder.title["en"];
    }
    return (
        <BasicCard
            item={item}
            entryActions={entryActions}
            title_field_local="short_title"
            title_field_global="short_title_en"
            title_complements_local={localTitleCompliment}
            title_complements_global={globalTitleCompliment}
        >
            <div className="card-info-box"></div>
        </BasicCard>
    );
}

export default Card;
