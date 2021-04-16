import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton, GuardedButton } from "../../components/buttons";
import { HorizontalOperationBar, Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog, Loading } from "../../components/feedback";
import { GetPosition, GetRightList } from "../../services";
import StaffContext from "../../context/staffContext";
import AppContext from "../../context/appContext";
import {
    PositionForm,
    RightManageCard,
    RightsSelectList,
    UnitForm
} from "../../view-components";
import { CardList } from "../../components/lists";
import { MULTIPLE_NESTED_SELECTION_MODE } from "../../utils/constants";
import { existsInArray, removeFromArray } from "../../utils/objectArray";
import { updateSelection } from "../../utils/itemsSelections";
import DoneIcon from "@material-ui/icons/Done";

function show(props) {
    const { slug } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showRights, setShowRights] = useState(false);

    const [targetRightsGroup, setTargetRightsGroup] = useState();

    const token = useContext(StaffContext).token;
    const locale = useContext(AppContext).locale;

    useEffect(() => {
        if (location.state) {
            setItem(location.state.item);
            setReady(true);
        } else {
            // console.log(location);
            GetPosition(
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

    return (
        <>
            <PageHeaderBar className="view-header">
                {ready ? (
                    <Title
                        className="view-title"
                        // pretitle={t("labels.Unit")}
                        pretitle={t("tools.positionsManagement")}
                        posttail={
                            item.holder_id
                                ? item.holder.full_title
                                : item.holder.title[locale]
                        }
                        title={
                            item.short_title
                                ? item.short_title
                                : (item.type ? item.type + " " : "") +
                                  item.title
                        }
                        btnSet={
                            item.deleted ? (
                                <div className="tag" style={{}}>
                                    {t("alerts.deleted")}
                                </div>
                            ) : (
                                <EditButton
                                    className="header-operation-btn"
                                    onClick={displayEditForm}
                                />
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
            <HorizontalOperationBar className="tool-links">
                <GuardedButton
                    className="tool-link"
                    onClick={() => {
                        setTargetRightsGroup("managedby");
                        setShowRights(true);
                    }}
                    title={t("operations.modifyRights")}
                    requiredRights={["use-rights-management-tool"]}
                    // requiredRights={["perform-manage-rights"]}
                    // TODO : write-fown correct right
                />

                <GuardedButton
                    className="tool-link"
                    onClick={() => {
                        setTargetRightsGroup("owned");
                        setShowRights(true);
                    }}
                    title={t("operations.modifyManagedbyRights")}
                    requiredRights={["use-rights-administration-tool"]}
                    // requiredRights={["perform-administrate-rights"]}
                    // TODO : write-fown correct right
                />

                <GuardedButton
                    className="tool-link"
                    onClick={() => {
                        console.log("modifyOwnedRights Pressed");
                    }}
                    title={t("operations.modifyOwnedRights")}
                    requiredRights={["use-rights-administration-tool"]}
                    // requiredRights={["perform-administrate-rights"]}
                    // TODO : write-fown correct right
                />
            </HorizontalOperationBar>
            {ready && (
                <FormDialog
                    show={showRights}
                    onClose={closeRightsDialog}
                    title={t("forms.selectRights")}
                    confirmation={{
                        classes: { root: "btn-confirm" },
                        icon: <DoneIcon />,
                        show: false,
                        onConfirm: data => {
                            console.log("confirm Clicked", data);
                        }
                    }}
                    dialogProps={{
                        maxWidth: "sm"
                    }}
                    formComponent={
                        <RightsSelectList
                            prevRights={item.rights}
                            targetGroup={targetRightsGroup}
                        />
                    }
                />
            )}
            <FormDialog
                show={showEdit}
                onClose={closeEditForm}
                title="ویرایش"
                formComponent={<PositionForm preset="edit" item={item} />}
            />
        </>
    );

    function displayEditForm() {
        setShowEdit(true);
    }

    function closeEditForm() {
        setReady(false);
        setShowEdit(false);
        GetPosition({ id: item.id }, token, getResponse, getError);
    }

    function closeRightsDialog() {
        setShowRights(false);
    }

    function getResponse(response) {
        let responseItem = response.data.data;
        if (item.slug != responseItem.slug) {
            history.replace(
                swapUrlTail(history.location.pathname, responseItem.slug)
            );
        }
        setItem(response.data.data);
        setReady(true);
    }
    function getError(failure) {
        console.log(failure);
    }
}

export default show;
