import React from "react";
import PropTypes from "prop-types";
import { data } from "jquery";
import "../../styles/cards.css";
import { useHistory, useRouteMatch } from "react-router-dom";

branchCard.propTypes = {
    item: PropTypes.any
};

function branchCard({ item, props }) {
    const history = useHistory();
    let match = useRouteMatch();

    function showItemView() {
        history.push(`${match.path}/${item.slug}`);
    }

    console.log("from branch card", props);
    return (
        <div className="card-container" onClick={showItemView}>
            {item.type} {item.title}
        </div>
    );
}

export default branchCard;
