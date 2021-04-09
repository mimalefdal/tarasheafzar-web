import React, { Children, Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/cards.css";
import AppContext from "../../context/appContext";

_card.propTypes = {
    item: PropTypes.any
};

function _card({
    item,
    entryActions,
    title_complements_local = null,
    title_complements_global = null,
    title_tail_local = null,
    title_tail_global = null,
    title_field_local = "full_title",
    title_field_global = "full_title_en",
    ...props
}) {
    // console.log("BasicCard", item.slug);

    const lang = useContext(AppContext).locale;

    return (
        <div
            className={
                "card-container basic flex row " +
                (props.className ? props.className + " " : "") +
                (props.expanded == true ? " expanded" : "")
            }
            id={props.id}
        >
            <div className="card-title-box basic flex column">
                <div className="card-title basic">
                    <div className="card-name-box">
                        {item[title_field_local]
                            ? item[title_field_local]
                            : (item.type ? item.type + " " : "") + item.title}
                        {title_tail_local && (
                            <span className="basic-card-title-tail">
                                {" "}
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
                            className="card-name-box global"
                            style={{ fontSize: "12px" }}
                        >
                            {item[title_field_global]
                                ? item[title_field_global]
                                : item.title_en +
                                  (item.type_en ? " " + item.type_en : "")}
                            {title_tail_global && (
                                <span className="basic-card-title-tail">
                                    {" "}
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
                <div className="btn-set card-btn-set basic">{entryActions}</div>
            </div>

            {!props.expanded && (
                <div className="filler" id="basic-card-free-fill-area">
                    {props.children}
                </div>
            )}

            <div className="filler" id="basic-card-free-fill-area">
                {props.children}
            </div>
        </div>
    );
}

export default _card;
