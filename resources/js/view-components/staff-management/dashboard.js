import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { ListTitle } from "../../components/list-controls";
import { StaffList } from "../../components/lists";
import { t } from "../../utils";
import { NewPage } from "../../views/errors";

function StaffDashboard(props) {
    return <NewPage title="Staff Management Dashboard" />;
}

export default StaffDashboard;
