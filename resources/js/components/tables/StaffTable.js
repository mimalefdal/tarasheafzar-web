import React, { Fragment, Component } from "react";
import { StaffEntry } from "../list-controls";
import { t } from "../../utils";
import "../../styles/tables.css";
import { LodingTableItems } from "../table-controls";

class Table extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);

        this.state = {
            selectedItems: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item) {
        let currentSelection = this.state.selectedItems;
        console.log(currentSelection);

        switch (this.props.selectionMode) {
            case "none": {
                return;
            }

            case "single": {
                // must implement

                currentSelection = [];
                currentSelection.push(item);
                this.setState({ selectedItems: currentSelection });
                return;
            }

            case "group": {
                let itemIsSelected = currentSelection.some(
                    item => item.id == item.id
                );

                if (itemIsSelected) {
                    // deselect
                    currentSelection = currentSelection.filter(
                        item => item.id != item.id
                    );
                } else {
                    // select
                    currentSelection.push(item);
                }
                this.setState({ selectedItems: currentSelection });
            }
        }
    }

    render() {
        return (
            <Fragment>
                <table className={this.props.className}>
                    <thead>
                        <tr>
                            <th className="">{t("labels.index")}</th>
                            <th className="">{t("labels.name")}</th>
                            <th className="">{t("labels.personnel_id")}</th>
                            <th className="">{t("labels.role")}</th>
                            <th className="">{t("labels.operation")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.loading ? (
                            <LodingTableItems columns="5" />
                        ) : (
                            this.props.items.map((item, index) => {
                                return (
                                    <StaffEntry
                                        item={item}
                                        key={index}
                                        onClick={this.handleClick}
                                        selectionMode={this.props.selectionMode}
                                        className={this.state.selectedRow}
                                    />
                                );
                            })
                        )}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default Table;
