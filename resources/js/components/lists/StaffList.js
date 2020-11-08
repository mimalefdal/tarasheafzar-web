import React, { Component, Fragment } from "react";
import { ApiClient } from "../../services";
import { RightEntry, ListTitle } from "../list-controls";
import "../../styles/lists.css";
import { t } from "../../utils";
import { RightsTable, StaffTable } from "../tables/index.js";
import Loading from "../../../../public/image/loading.png";

class List extends Component {
    constructor() {
        super();
        this.state = {
            staff: [],
            loaded: false
        };
    }

    async componentDidMount() {
        let token = sessionStorage.getItem("StaffAccessToken");

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + token
        };

        const response = await ApiClient.get("/staff", {
            headers: headers
        }).catch(error => {
            console.log(error.response);
            this.setState({ staff, loaded: true });
        });

        const staff = response.data;
        // console.log(staff);
        this.setState({ staff, loaded: true });
    }

    render() {
        return (
            <div className="list-container ">
                <div className="list-body  ">
                    {/* <StaffTable
                        items={this.state.staff}
                        loading={this.state.loaded}
                        selectionMode="none"
                        className="general-shadow"
                    /> */}
                    {this.state.loaded ? (
                        <StaffTable
                            items={this.state.staff}
                            selectionMode="none"
                            className="general-shadow"
                            loading={!this.state.loaded}
                        />
                    ) : (
                        <StaffTable
                            items={this.state.staff}
                            selectionMode="none"
                            className="general-shadow"
                            loading={!this.state.loaded}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default List;
