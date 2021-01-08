import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { t } from "../../utils";
import { StaffList } from "../../view-components";

function View(props) {
    return (
        <div className="page-content">
            <PageHeaderBar>
                <ListTitle
                    title={t("custum-titles.staffListTitle")}
                    btnSet={null}
                />
            </PageHeaderBar>
            <StaffList />
        </div>
    );
}

export default View;
