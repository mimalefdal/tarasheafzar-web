import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/button";
import { ListTitle } from "../../components/list-controls";
import { StaffList } from "../../components/lists";
import { t } from "../../utils";

function View(props) {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar>
                <ListTitle
                    title={t("custum-titles.staffListTitle")}
                    btnSet={
                        <AddButton
                            className="list-operation-btn"
                            style={{ width: "35px" }}
                            target="staff/add"
                        />
                    }
                />
            </PageHeaderBar>
            <StaffList />
        </div>
    );
}

export default View;
