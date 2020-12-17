import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "../../styles/checklists.css";
import apiClient from "../../services/api";
import { t } from "../../utils";
import { FormLoadingData } from "../form-controls";
import DoneIcon from "@material-ui/icons/Done";
import DoneSharp from "@material-ui/icons/Done";
import {
    ChecklistHeaderTripleColumn,
    ChecklistRowTripleColumn
} from "../checklist-controls";

function SystemInitialize() {
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("StaffAccessToken")
    };

    useEffect(() => {
        apiClient
            .get("/initialize/status", {
                headers: headers
            })
            .then(response => {
                // console.log(response.data);
                setStatus(response.data);
                setLoading(false);
            })
            .catch(error => {
                // console.log(error.response);
                setLoading(false);
            });
    }, []);

    return (
        <div className="list-container ">
            <div className="list-body  ">
                <table>
                    <thead>
                        <ChecklistHeaderTripleColumn />
                    </thead>
                    <tbody>
                        {
                            <ChecklistRowTripleColumn
                                loadstate={loading}
                                itemTitle="ثبت اکانت مدیرعامل"
                                itemStatus={!loading && status.defineCeo}
                                itemComment=""
                            />
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SystemInitialize;
