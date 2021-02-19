import React from "react";

import { PageHeaderBar } from "../../components";
import { ChecklistTitle } from "../../components/checklist-controls";
import { SystemInitializeCheckList } from "../../components/checklists";
import { t } from "../../utils";

function Start() {
    return (
        <div className="">
            <PageHeaderBar>
                <ChecklistTitle
                    title={t("lists.initializeChecklistTitle")}
                    btnSet={null}
                />
            </PageHeaderBar>

            <SystemInitializeCheckList />
        </div>
    );
}

export default Start;
