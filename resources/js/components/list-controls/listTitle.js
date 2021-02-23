import React from "react";
import PropTypes from "prop-types";

_listTitle.propTypes = {
    title: PropTypes.string
};

function _listTitle(props) {
    return (
        <div className="list-title">
            <div className="items-ribbon">
                <div className="title-text list-title-text">{props.title}</div>
                <div style={{ flexGrow: 1 }}></div>
                <div className="btn-set">{props.btnSet}</div>
            </div>
        </div>
    );
}

export default _listTitle;
