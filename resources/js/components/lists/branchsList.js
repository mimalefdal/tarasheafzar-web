import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ApiClient } from "../../services";
import { BranchCard } from "../cards";
import { FormLoadingData } from "../form-controls";
import StaffContext from "../../context/staffContext";

branchsList.propTypes = {};

function branchsList(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    var branchlist = [];

    const token = useContext(StaffContext).token;

    useEffect(() => {
        // console.log(apiHeaders);
        ApiClient.get("/branches", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                // console.log(response);
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
