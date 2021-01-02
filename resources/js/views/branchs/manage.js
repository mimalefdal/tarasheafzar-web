import React from "react";
import { PageHeaderBar } from "../../components";
import { AddButton } from "../../components/buttons";
import { ListTitle } from "../../components/list-controls";
import { BranchsList } from "../../components/lists";
import { t } from "../../utils";

function manageBranchs(props) {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar>
                <ListTitle
                    title={t("tools.branchsManagement")}
                    btnSet={
                        <AddButton
                            className="header-operation-btn"
                            target="branchs/define"
                        />
                    }
                />
            </PageHeaderBar>
            <BranchsList />
        </div>
    );
}

export default manageBranchs;
