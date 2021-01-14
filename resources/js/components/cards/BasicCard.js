import React, { Children, Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/cards.css";
import AppContext from "../../context/appContext";

CardBase.propTypes = {
    item: PropTypes.any
};

function CardBase({
    item,
    entryActions,
    title_complements_local = null,
    title_complements_global = null,
    title_tail_local = null,
    title_tail_global = null,
    ...props
}) {
    // console.log("from branch card", item);

    const lang = useContext(AppContext).locale;

    return (
        <div className="card-container flex row">
            <div className="card-title-action-box flex column">
                <div className="card-title">
                    <div className="card-title-box">
                        {item.full_title
                            ? item.full_title
                            : item.type + " " + item.title}
                        {title_tail_local && (
                            <span className="basic-card-title-tail">
                                {title_tail_local}
                            </span>
                        )}
                        {title_complements_local && (
                            <div className="basic-card-title-complement">
                                {title_complements_local}
                            </div>
                        )}
                    </div>
                    {lang != "en" && (
                        <div
                            className="card-title-box global"
                            style={{ fontSize: "12px" }}
                        >
                            {item.full_title_en
                                ? item.full_title_en
                                : item.type_en + " " + item.title_en}
                            {title_tail_global && (
                                <span className="basic-card-title-tail">
                                    {title_tail_global}
                                </span>
                            )}
                            {title_complements_global && (
                                <div className="basic-card-title-complement global">
                                    {title_complements_global}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="btn-set card-btn-set">{entryActions}</div>
            </div>

            <div className="filler">{props.children}</div>
        </div>
    );
}

export default CardBase;
