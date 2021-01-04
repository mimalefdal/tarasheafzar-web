import React, { Component } from "react";
import { currentLang, t } from "../../../utils";
import { EditButton, DeleteButton, ViewButton } from "../../buttons";

function Entry({ item, ...props }) {
    let activeState;
    if (item.activation) {
        activeState = t("labels.active");
    } else {
        activeState = t("labels.deactive");
    }

    const titles = JSON.parse(item.title);
    // console.log(title_local);

    return (
        <tr className="">
            <td>{item.id}</td>
            <td className="">{titles[currentLang()]}</td>
            {/* <td className="">{titles.en}</td> */}
            <td className="">{item.slug}</td>
            <td className="">{activeState}</td>
            <td className="">
                <div className="table-row-btn-set">
                    <ViewButton
                        // className={this.state.selected ? "selected" : ""}
                        target={"right/" + item.slug}
                    />
                    <EditButton
                        // className={this.state.selected ? "selected" : ""}
                        target={"right/" + item.slug + "/edit"}
                    />
                    <DeleteButton
                        // className={this.state.selected ? "selected" : ""}
                        target="#"
                    />
                </div>
            </td>
        </tr>
    );
}

export default Entry;
