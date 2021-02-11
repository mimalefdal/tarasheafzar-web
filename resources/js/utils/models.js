import React from "react";
import {
    BranchForm,
    DepartmentForm,
    PositionForm,
    UnitForm
} from "../view-components";

export function _getDefineFormFor(model) {
    switch (model) {
        case "branch":
            return <BranchForm />;
            break;
        case "department":
            return <DepartmentForm />;
            break;
        case "unit":
            return <UnitForm />;
            break;
        case "position":
            return <PositionForm />;
            break;
        default:
            return null;
            break;
    }
}
