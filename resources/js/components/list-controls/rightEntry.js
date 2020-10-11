import React, { Component } from "react";
import { t } from "../../utils";
import { EditButton, DeleteButton, ViewButton } from "../button";

class rightEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            selectedRow: ""
        };

        this.handleSelect = this.handleSelect.bind(this);
        // console.log(props);
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

        this.props.onClick(this.props.right);
    }

    render() {
        let activeState;
        if (this.props.right.activation) {
            activeState = t("labels.active");
        } else {
            activeState = t("labels.deactive");
        }
        return (
            <tr className={this.state.selectedRow}>
                <td onClick={this.handleSelect}>{this.props.right.id}</td>
                <td className="">{this.props.right.title_fa}</td>
                <td className="">{this.props.right.title}</td>
                <td className="">{this.props.right.slug}</td>
                <td className="">{activeState}</td>
                <td className="">
                    <div className="btn-set">
                        <ViewButton
                            className={this.state.selected ? "selected" : ""}
                            target={"right/" + this.props.right.slug}
                        />
                        <EditButton
                            className={this.state.selected ? "selected" : ""}
                            target={"right/" + this.props.right.slug + "/edit"}
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

export default rightEntry;
