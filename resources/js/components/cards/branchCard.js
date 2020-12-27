import React from "react";
import PropTypes from "prop-types";
import { data } from "jquery";
import "../../styles/cards.css";

branchCard.propTypes = {
    data: PropTypes.any
};

function branchCard(props) {
    // console.log("from branch card", props);
    return (
        <div className="card-container">
            {props.data.type} {props.data.title}
        </div>
    );
}

export default branchCard;
