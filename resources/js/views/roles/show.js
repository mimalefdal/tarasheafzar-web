import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { PageHeaderBar } from "../../components";
import {
    EditButton,
    GuardedAction,
    GuardedButton
} from "../../components/buttons";
import { GetRole, UpdateAccessRights, UpdateRoleHolders } from "../../services";
import {
    FormDialog,
    Loading,
    MultiListSelectDialog,
    SelectDialog
} from "../../components/feedback";
import { swapUrlTail, t } from "../../utils";
import StaffContext from "../../context/staffContext";
import AppContext from "../../context/appContext";
import { Title } from "../../components/view-controls";
import { TitledCollapse } from "../../components/list-controls";
import { countObjectChildEntries } from "../../utils/objectUtils";
import {
    RoleForm,
    RightSelectDialog,
    PositionSelectList
} from "../../view-components";

function show(props) {
    const { slug } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showRights, setShowRights] = useState(false);
    const [showZones, setShowZones] = useState(false);

    const [operationData, setOperationData] = useState({});

    const token = useContext(StaffContext).token;
    const locale = useContext(AppContext).locale;

    const accessActions = (
        <>
            <GuardedAction
                action="edit"
                feature="modify-role-rights-operation"
                onClick={displayRightsDialog}
            />
        </>
    );

    const holdersActions = (
        <>
            <GuardedAction
                action="edit"
                feature="manage-roles-operation"
                onClick={displayManageDialog}
            />
        </>
    );

    const managersActions = (
        <>
            <GuardedAction
                action="edit"
                feature="modify-role-managers-operation"
                onClick={displayModifyManagersDialog}
            />
        </>
    );

    const ownersActions = (
        <>
            <GuardedAction
                action="edit"
                feature="modify-role-owners-operation"
                onClick={displayModifyOwnersDialog}
            />
        </>
    );

    useEffect(() => {
        if (location.state) {
            setItem(location.state.item);
            setReady(true);
        } else {
            // console.log(location);
            GetRole(
                { slug: slug },
                token,
                response => {
                    setItem(response.data.data);
                    setReady(true);
                },
                failure => {
                    console.log(failure);
                }
            );
        }
    }, []);

    useEffect(() => {
        item && console.log("show", item);
    }, [item]);

    function displayEditForm() {
        setShowEdit(true);
    }

    function closeEditForm() {
        setReady(false);
        setShowEdit(false);
        GetRole({ id: item.id }, token, getRoleResponse, getRoleError);
    }

    function getRoleResponse(response) {
        console.log(response);
        let responseItem = response.data.data;
        if (item.slug != responseItem.slug) {
            history.replace(
                swapUrlTail(history.location.pathname, responseItem.slug)
            );
        }
        setItem(response.data.data);
        setReady(true);
    }
    function getRoleError(failure) {
        console.log(failure);
    }

    function displayRightsDialog(operationInfo) {
        console.log("showRole", "display MODIFY-RIGHTS clicked!");
        setShowRights(true);
    }

    function closeRightDialog() {
        setShowRights(false);
    }

    function handleRightsUpdate(rights) {
        // console.log("show->handleRightsUpdate", rights);
        setItem({ ...item, rights: [...rights] });
    }

    function displayManageDialog() {
        console.log("showRole", "display MANAGE clicked!");
        setShowZones(true);
    }

    function closeZoneDialog() {
        setShowZones(false);
    }

    function handleZonesUpdate(zoneObject) {
        console.log("handleZonesUpdate", zoneObject);
    }

    function displayModifyManagersDialog() {
        console.log("showRole", "display MODIFY-MANAGERS clicked!");
    }

    function displayModifyOwnersDialog() {
        console.log("showRole", "display MODIFY-OWNERS clicked!");
    }

    return (
        <>
            <PageHeaderBar className="view-header">
                {ready ? (
                    <Title
                        className="view-title"
                        // pretitle={t("tools.rolesManagement")}
                        title={item.title}
                        btnSet={
                            item.deleted ? (
                                <div className="tag" style={{}}>
                                    {t("alerts.deleted")}
                                </div>
                            ) : (
                                <>
                                    <GuardedAction
                                        action="edit"
                                        feature="edit-role-operation"
                                        onClick={displayEditForm}
                                        className="header-operation-btn"
                                    />
                                </>
                            )
                        }
                    />
                ) : (
                    <Loading
                        preset="onDarkTitle"
                        height="50px"
                        width="50px"
                        color="white"
                    />
                )}
            </PageHeaderBar>

            {ready && (
                <>
                    <TitledCollapse
                        title={t("labels.access_p")}
                        timeout={200}
                        itemsCount={item.rights.length}
                        btnSet={accessActions}
                    >
                        <div style={{ textAlign: "right" }}>
                            {item.rights.map((right, index) => (
                                <div key={index}>{right.title}</div>
                            ))}
                        </div>
                    </TitledCollapse>

                    <TitledCollapse
                        title={t("labels.holders")}
                        timeout={200}
                        itemsCount={countObjectChildEntries(item._holders)}
                        btnSet={holdersActions}
                    >
                        <div style={{ textAlign: "right" }}>
                            {Object.keys(item._holders).map(type => {
                                return item._holders[
                                    type
                                ].map((holder, index) => (
                                    <div key={index}>
                                        {"(" +
                                            t("labels." + type + "_s") +
                                            ") " +
                                            holder.liststitle}
                                    </div>
                                ));
                            })}
                        </div>
                    </TitledCollapse>

                    <TitledCollapse
                        title={t("labels.managers")}
                        timeout={200}
                        itemsCount={countObjectChildEntries(item._managers)}
                        btnSet={managersActions}
                    >
                        <div style={{ textAlign: "right" }}>
                            {Object.keys(item._managers).map(type => {
                                return item._managers[
                                    type
                                ].map((manager, index) => (
                                    <div key={index}>
                                        {"(" +
                                            t("labels." + type + "_s") +
                                            ") " +
                                            manager.liststitle}
                                    </div>
                                ));
                            })}
                        </div>
                    </TitledCollapse>

                    <TitledCollapse
                        title={t("labels.owners")}
                        timeout={200}
                        itemsCount={countObjectChildEntries(item._owners)}
                        btnSet={ownersActions}
                    >
                        <div style={{ textAlign: "right" }}>
                            {Object.keys(item._owners).map(type => {
                                return item._owners[
                                    type
                                ].map((owner, index) => (
                                    <div key={index}>
                                        {"(" +
                                            t("labels." + type + "_s") +
                                            ") " +
                                            owner.liststitle}
                                    </div>
                                ));
                            })}
                        </div>
                    </TitledCollapse>

                    <FormDialog
                        show={showEdit}
                        onClose={closeEditForm}
                        title="ویرایش"
                        formComponent={<RoleForm preset="edit" item={item} />}
                    />

                    <RightSelectDialog
                        show={showRights}
                        onClose={closeRightDialog}
                        onUpdate={handleRightsUpdate}
                        operationData={{
                            targetGroup: "managedby",
                            targetScope: { role: [item] },
                            rightsField: "rights",
                            operation: t("operations.modifyRights"),
                            dataService: UpdateAccessRights
                        }}
                        item={item}
                    />

                    {/* zones Dialog */}
                    <MultiListSelectDialog
                        show={showZones}
                        onClose={closeZoneDialog}
                        onUpdate={handleZonesUpdate}
                        title={t("operations.modifyRoleHolders")}
                        itemTitle={item.title}
                        selectionLists={[
                            {
                                label: t("labels.positions"),
                                component: (
                                    <PositionSelectList
                                        prevPositions={item._holders.positions}
                                        targetGroup="all"
                                        targetScope={{ role: [item] }}
                                    />
                                )
                            },
                            {
                                label: t("labels.staff_p"),
                                component: (
                                    <PositionSelectList
                                        prevPositions={item._holders.positions}
                                        targetGroup="all"
                                        targetScope={{ role: [item] }}
                                    />
                                )
                            }
                        ]}
                        confirmation={{
                            classes: { root: "btn-confirm" },
                            show: false,
                            dataService: UpdateRoleHolders
                        }}
                        dialogProps={{
                            maxWidth: "sm"
                        }}
                        confirmDialogProps={{
                            confirmMessageAction: t(
                                "expressions.sureAboutChanges"
                            )
                        }}
                    />
                </>
            )}
        </>
    );
}

export default show;
