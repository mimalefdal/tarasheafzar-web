import React, { Component } from "react";
import { t } from "../../../utils";
import { EditButton, DeleteButton, ViewButton } from "../../buttons";

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            selectedRow: ""
        };

        this.handleSelect = this.handleSelect.bind(this);
        console.log(props.item.roles[0].unit_id != null);
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
                <td className="">{this.props.item.personnel_id}</td>
                <td className="">
                    {this.props.item.firstname} {this.props.item.lastname}
                </td>
                <td className="">
                    {this.props.item.roles[0].unit_id != null ? (
                        <div>
                            <p>{this.props.item.roles[0].unit.title_fa}</p>
                            <p style={{ fontSize: "8px" }}>
                                {
                                    this.props.item.roles[0].unit.department
                                        .title_fa
                                }
                            </p>
                        </div>
                    ) : (
                        "-"
                    )}
                </td>
                <td className=""> {this.props.item.roles[0].title_fa} </td>
                <td className="">
                    <div className="table-row-btn-set">
                        <ViewButton
                            className={
                                "table-operation-icon-btn " +
                                this.state.selected
                                    ? "selected"
                                    : ""
                            }
                            target={"staff/" + this.props.item.username}
                        />
                        <EditButton
                            className={
                                "table-operation-icon-btn " +
                                this.state.selected
                                    ? "selected"
                                    : ""
                            }
                            target={
                                "staff/" + this.props.item.username + "/edit"
                            }
                        />
                        <DeleteButton
                            className={
                                "table-operation-icon-btn " +
                                this.state.selected
                                    ? "selected"
                                    : ""
                            }
                            target="#"
                        />
                    </div>
                </td>
            </tr>
        );
    }
}

export default Control;
