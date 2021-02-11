export { default as ApiClient } from "./api-service";

export { tryAdd as AddBranch } from "./branch-service";
export { getIndex as GetBranchsList } from "./branch-service";
export { getItem as GetBranch } from "./branch-service";
export { tryUpdate as UpdateBranch } from "./branch-service";
export { tryDelete as DeleteBranch } from "./branch-service";

export { tryAdd as AddDepartment } from "./department-service";
export { getIndex as GetDepartmentsList } from "./department-service";
export { getItem as GetDepartment } from "./department-service";
export { tryUpdate as UpdateDepartment } from "./department-service";
export { tryDelete as DeleteDepartment } from "./department-service";

export { tryAdd as AddUnit } from "./unit-service";
export { getIndex as GetUnitsList } from "./unit-service";
export { getItem as GetUnit } from "./unit-service";
export { tryUpdate as UpdateUnit } from "./unit-service";
export { tryDelete as DeleteUnit } from "./unit-service";

export { tryAdd as AddPosition } from "./position-service";
export { getIndex as GetPositionsList } from "./position-service";
export { getItem as GetPosition } from "./position-service";
export { tryUpdate as UpdatePosition } from "./position-service";
export { tryDelete as DeletePosition } from "./position-service";

export { tryAdd as AddStaff } from "./staff-service";
export { getIndex as GetStaffList } from "./staff-service";

export { _getStatus as GetInitializeStatus } from "./initialize-service";
export { _installLicence as InitializeLicence } from "./initialize-service";
export { _initiateSystem as InitiateSystem } from "./initialize-service";
export { defineCeo as InitializeCEO } from "./initialize-service";

export { tryAdd as AddRight } from "./right-service";
export { getIndex as GetRightList } from "./right-service";

export { getValues as GetValidValues } from "./values-service";
