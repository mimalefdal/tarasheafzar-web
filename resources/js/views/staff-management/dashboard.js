import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { t } from "../../utils";

function StaffDashboard(props) {
    return (
        <div className="App">
            <div>Staff Management Dashboard View</div>
            <Link to="/staff-management">Back to Staff Management</Link>
        </div>
    );
}

export default StaffDashboard;
