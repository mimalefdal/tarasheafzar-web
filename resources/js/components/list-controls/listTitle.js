import React from "react";
import { ReactSVG } from "react-svg";
import { AddButton, EditButton } from "../button";
import Icon1 from "../../assets/images/house.svg";
function listTitle(props) {
    return (
        <div className="list-title">
            <div className="items-ribbon">
                <div className="title-text list-title-text">{props.title}</div>
                <div style={{ flexGrow: 1 }}></div>
                <div className="btn-set">
                    <AddButton
                        className="list-operation-btn"
                        style={{ width: "35px" }}
                        target="right/add"
                    />
                </div>
            </div>
        </div>
    );
}

export default listTitle;
