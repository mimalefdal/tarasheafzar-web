import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { StaffList } from "../../components/lists";
import { t } from "../../utils";

function View(props) {
    return (
        <div className="page-content responsive-inner-width">
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
