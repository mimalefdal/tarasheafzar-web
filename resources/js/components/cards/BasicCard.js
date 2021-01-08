import React, { Children, Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/cards.css";
import AppContext from "../../context/appContext";

CardBase.propTypes = {
    item: PropTypes.any
};

function CardBase({ item, entryActions, ...props }) {
    // console.log("from branch card", item);

    const lang = useContext(AppContext).locale;

    return (
        <div className="card-container flex row">
            <div className="card-title-action-box flex column">
                <div className="card-title">
                    {item.type} {item.title}
                    {lang != "en" && (
                        <div className="global" style={{ fontSize: "10px" }}>
                            {item.title_en} {item.type_en}
                        </div>
                    )}
                </div>
                <div className="btn-set card-btn-set">
                    {entryActions}
                    {/* <ViewButton
                        className="card-operation-btn"
                        target={showTarget}
                    />
                    <DeleteButton
                        className="card-operation-btn"
                        onClick={() => setAskToConfirm(true)}
                    /> */}
                </div>
            </div>

            <div className="filler">{props.children}</div>
        </div>
    );
}

export default CardBase;
