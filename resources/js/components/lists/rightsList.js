import React, { Component, Fragment } from "react";
import { ApiClient } from "../../services";
import { RightEntry, ListTitle } from "../list-controls";
import "../../styles/lists.css";
import { t } from "../../utils";
import { RightsTable } from "../tables/index.js";
import Loading from "../../../../public/image/loading.png";

class rightsList extends Component {
    constructor() {
        super();
        this.state = {
            rights: [],
            loaded: false
        };
    }

    async componentDidMount() {
        let token = sessionStorage.getItem("StaffAccessToken");

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + token
        };

        // ApiClient.get("/rights", {
        //     headers: headers
        // }).then(response => {
        //     console.log(response);
        //     this.setState({ rights: response.data });
        // });

        const response = await ApiClient.get("/rights", {
            headers: headers
        }).catch(error => {
            console.log(error.response);
        });

        const rights = response.data;
        // console.log(rights);
        this.setState({ rights, loaded: true });
    }

    render() {
        return (
            <div className="list-container ">
                <div className="list-body  ">
                    {this.state.loaded ? (
                        <RightsTable
                            rights={this.state.rights}
                            selectionMode="none"
                            className="general-shadow"
                        />
                    ) : (
                        <img
                            src={Loading}
                            alt="Loading"
                            style={{ height: "50px", width: "50px" }}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default rightsList;
