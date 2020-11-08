import React, { Component } from "react";
import { t } from "../../utils";
import { EditButton, DeleteButton, ViewButton } from "../button";

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            selectedRow: ""
        };

        this.handleSelect = this.handleSelect.bind(this);
        // console.log(props.item.roles[0].title_fa);
    }

    handleSelect() {
        switch (this.props.selectionMode) {
            case "none": {
                return;
            }

            case "single": {
                // must implement
                return;
            }

            case "group": {
                if (this.state.selected == false) {
                    this.setState({
                        selectedRow: "selected-row",
                        selected: true
                    });
                } else {
                    this.setState({ selectedRow: "", selected: false });
                }
            }
        }

        this.props.onClick(this.props.item);
    }

    render() {
        let activeState;
        if (this.props.item.activation) {
            activeState = t("labels.active");
        } else {
            activeState = t("labels.deactive");
        }
        return (
            <tr className={this.state.selectedRow}>
                <td onClick={this.handleSelect}>{this.props.item.id}</td>
                <td className="">
                    {this.props.item.firstname} {this.props.item.lastname}
                </td>
                <td className="">{this.props.item.personnel_id}</td>
                <td className=""> {this.props.item.roles[0].title_fa} </td>
                <td className="">
                    <div className="table-row-btn-set">
                        <ViewButton
                            className={this.state.selected ? "selected" : ""}
                            target={"staff/" + this.props.item.username}
                        />
                        <EditButton
                            className={this.state.selected ? "selected" : ""}
                            target={
                                "staff/" + this.props.item.username + "/edit"
                            }
                        />
                        <DeleteButton
                            className={this.state.selected ? "selected" : ""}
                            target="#"
                        />
                    </div>
                </td>
            </tr>
        );
    }
}

export default Control;