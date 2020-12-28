import React from "react";

import { PageHeaderBar } from "../../components";
import { ChecklistTitle } from "../../components/checklist-controls";
import { SystemInitializeCheckList } from "../../components/checklists";
import { t } from "../../utils";

function Start() {
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar>
                <ChecklistTitle
                    title={t("custum-titles.initializeChecklistTitle")}
                    btnSet={null}
                />
            </PageHeaderBar>

            <SystemInitializeCheckList />
        </div>
    );
}

export default Start;
