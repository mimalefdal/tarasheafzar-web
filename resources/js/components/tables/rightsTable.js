import React, { Fragment, Component } from "react";
import { t } from "../../utils";
import "../../styles/tables.css";
import { LodingTableItems } from "../table-controls";
import { RightEntry } from ".";

class rightsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItems: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(right) {
        let currentSelection = this.state.selectedItems;
        console.log(currentSelection);

        switch (this.props.selectionMode) {
            case "none": {
                return;
            }

            case "single": {
                // must implement

                currentSelection = [];
                currentSelection.push(right);
                this.setState({ selectedItems: currentSelection });
                return;
            }

            case "group": {
                let rightIsSelected = currentSelection.some(
                    item => item.id == right.id
                );

                if (rightIsSelected) {
                    // deselect
                    currentSelection = currentSelection.filter(
                        item => item.id != right.id
                    );
                } else {
                    // select
                    currentSelection.push(right);
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
                            <th className="">{t("labels.title_fa")}</th>
                            <th className="">{t("labels.title_en")}</th>
                            <th className="">{t("labels.slug")}</th>
                            <th className="">{t("labels.activation")}</th>
                            <th className="">{t("labels.operation")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.loading ? (
                            <LodingTableItems columns="6" />
                        ) : (
                            this.props.rights.map((right, index) => {
                                return (
                                    <RightEntry
                                        right={right}
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

export default rightsTable;
