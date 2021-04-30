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

    const localDisplayTitle = item.display_title
        ? "(" + item.display_title + ")"
        : "";

    const globalDisplayTitle = item.display_title_en
        ? "(" + item.display_title_en + ")"
        : "";

    return (
        <BasicCard
            id={props.id}
            item={item}
            entryActions={entryActions}
            title_complements_local={localTitleCompliment}
            title_complements_global={globalTitleCompliment}
            title_field_local="short_title"
            title_field_global="short_title_en"
            title_tail_local={localDisplayTitle}
            title_tail_global={globalDisplayTitle}
        >
            <div className="flex card-info-box">
                ظرفیت استخدام {item.recruit_capacity}
            </div>
        </BasicCard>
    );
}

export default Card;
