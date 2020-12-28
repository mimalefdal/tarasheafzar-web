import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ApiClient } from "../../services";
import { apiHeaders } from "../../services/api";
import { BranchCard } from "../cards";
import { FormLoadingData } from "../form-controls";

branchsList.propTypes = {};

function branchsList(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    var branchlist = [];

    useEffect(() => {
        ApiClient.get("/branchs", { headers: apiHeaders })
            .then(response => {
                // console.log(response.data.data);
                setItems(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <FormLoadingData />
            ) : (
                items.map(item => {
                    return <BranchCard key={item.id} item={item} />;
                })
            )}
        </div>
    );
}

export default branchsList;
