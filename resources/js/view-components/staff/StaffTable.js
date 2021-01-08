import React, { Fragment, Component, useEffect, useState } from "react";
import { t } from "../../utils";
import "../../styles/tables.css";
import { LodingTableItems } from "../../components/table-controls";
import { StaffEntry } from "..";

function Table({ items, ...props }) {
    const [loading, setLoading] = useState(props.loading);

    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);
    return (
        <Fragment>
            <table className={props.className}>
                <thead>
                    <tr>
                        <th className="">{t("labels.index")}</th>
                        <th className="">{t("labels.personnel_id")}</th>
                        <th className="">{t("labels.name")}</th>
                        <th className="">{t("labels.position")}</th>
                        <th className="">{t("labels.depunit")}</th>
                        <th className="">{t("labels.operation")}</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <LodingTableItems columns="6" />
                    ) : (
                        items.map((item, index) => {
                            if (item.national_id != null)
                                return <StaffEntry item={item} key={index} />;
                        })
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Table;
