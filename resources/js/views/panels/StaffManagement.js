import React, { Component } from "react";
import { t } from "../../utils";
import { AddFormRight } from "../../components/staff-management";

export default class StaffManagement extends Component {
    render() {
        return (
            <div style={{ width: "50%", margin: "auto" }}>
                <div>Welcome to Staff Management Panel</div>
                <AddFormRight />
            </div>
        );
    }
}
