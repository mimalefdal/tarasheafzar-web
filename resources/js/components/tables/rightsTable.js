import React, { Fragment, useEffect, useState } from "react";
import { t } from "../../utils";
import "../../styles/tables.css";
import { LodingTableItems } from "../table-controls";
import { RightEntry } from ".";

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
                        <th className="">{t("labels.title_local")}</th>
                        {/* <th className="">{t("labels.title_en")}</th> */}
                        <th className="">{t("labels.slug")}</th>
                        <th className="">{t("labels.activation")}</th>
                        <th className="">{t("labels.operation")}</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <LodingTableItems columns="6" />
                    ) : (
                        items.map((right, index) => {
                            return <RightEntry item={right} key={index} />;
                        })
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Table;
