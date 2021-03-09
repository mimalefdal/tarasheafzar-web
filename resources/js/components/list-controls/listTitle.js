import React from "react";
import PropTypes from "prop-types";

_listTitle.propTypes = {
    title: PropTypes.string
};

function _listTitle(props) {
    return (
        <div className="flex column list-title">
            <div className="items-ribbon">
                <div className="title-text list-title-text">{props.title}</div>
                <div style={{ flexGrow: 1 }}></div>
                <div className="btn-set">{props.btnSet}</div>
            </div>
            {props.options && (
                <div className="items-ribbon">
                    <div className="flex row option-set">{props.options}</div>
                </div>
            )}
        </div>
    );
}

export default _listTitle;
