import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "../../styles/checklists.css";
import { t } from "../../utils";
import DoneIcon from "@material-ui/icons/Done";
import DoneSharp from "@material-ui/icons/Done";
import {
    ChecklistHeaderTripleColumn,
    ChecklistRowTripleColumn
} from "../checklist-controls";
import { GetInitializeStatus } from "../../services";
import StaffContext from "../../context/staffContext";

function SystemInitialize(props) {
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const token = useContext(StaffContext).token;

    useEffect(() => {
        GetInitializeStatus(
            {},
            token,
            response => {
                // console.log("Initialize View", response);
                setStatus(response.data);
                setLoading(false);
            },
            error => {
                // console.log("Initialize View", error);
                setLoading(false);
            }
        );
    }, []);

    return (
        <div className="list-container ">
            <div className="list-body  ">
                <table>
                    <thead>
                        <ChecklistHeaderTripleColumn />
                    </thead>
                    <tbody>
                        <ChecklistRowTripleColumn
                            loadstate={loading}
                            itemTitle="ثبت اکانت مدیرعامل"
                            itemStatus={status && status.defineCeo}
                            itemComment=""
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SystemInitialize;
