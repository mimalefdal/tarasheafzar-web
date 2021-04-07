import React from "react";
import { SpecCard } from "../../components/cards";
import { TitledCollapse } from "../../components/list-controls";
import { SimpleList } from "../../components/lists";
import { t } from "../../utils";

function _component({
    staff,
    title,
    preset = "default",
    btnSet,
    initialState,
    ...props
}) {
    let specCards, displayTitle;

    switch (preset) {
        case "overall":
            displayTitle = t("labels.allspecs");
            specCards = <></>;
            break;

        case "personal":
            displayTitle = t("labels.specs", { attr: t("attr.personal") });
            specCards = (
                <>
                    <SpecCard
                        spec={t("labels.personnel_id")}
                        value={staff.personnel_id}
                    />
                    <SpecCard
                        spec={t("labels.national_id")}
                        value={staff.national_id}
                    />
                    <SpecCard
                        spec={t("labels.idcert_no")}
                        value={staff.idcert_no}
                    />
                    <SpecCard spec={t("labels.name")} value={staff.fullname} />
                </>
            );
            break;

        case "carrier":
            displayTitle = t("labels.specs", { attr: t("attr.carrier") });
            specCards = (
                <>
                    <SpecCard
                        spec={t("labels.joblevel")}
                        value={staff.position.joblevel_title}
                    />
                    <SpecCard
                        spec={t("labels.position")}
                        value={staff.position.short_title}
                    />
                    <SpecCard
                        spec={t("labels.block")}
                        value={staff.holder.full_title}
                    />
                </>
            );
            break;

        case "access":
            specCards = (
                <div style={{ textAlign: "right" }}>
                    {staff.rights.map((right, index) => (
                        <div key={index}>{right.title}</div>
                    ))}
                </div>
            );
            break;

        case "crew":
            displayTitle = t("labels.managebleCrew");
            specCards = (
                <div style={{ textAlign: "right" }}>
                    {staff.staffCrew.map(staff => {
                        return <div key={staff.id}>{staff.fullname}</div>;
                    })}
                </div>
            );
            break;
        default:
            // no preset
            displayTitle = t("labels.specs", { attr: "..." });
            specCards = props.children;
            break;
    }
    return (
        <>
            <TitledCollapse
                title={title ? title : displayTitle}
                initialState={initialState && initialState}
                btnSet={btnSet}
            >
                {specCards}
            </TitledCollapse>
        </>
    );
}

export default _component;
