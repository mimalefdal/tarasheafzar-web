import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ApiClient } from "../../services";
import { BranchCard } from "../cards";
import { FormLoadingData } from "../form-controls";

branchsList.propTypes = {};

function branchsList(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    var branchlist = [];

    useEffect(() => {
        // console.log(apiHeaders);
        ApiClient.get("/branches", {
            headers: {
                Accept: "application/json",
                Authorization:
                    "Bearer " + sessionStorage.getItem("StaffAccessToken")
            }
        })
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
