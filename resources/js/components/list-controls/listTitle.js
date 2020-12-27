import React from "react";
import PropTypes from "prop-types";

listTitle.propTypes = {
    title: PropTypes.string
};

function listTitle(props) {
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

export default listTitle;
