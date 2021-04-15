import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton, GuardedAction } from "../../components/buttons";
import { Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog, Loading } from "../../components/feedback";
import { ApiClient, GetPosition, GetRightList } from "../../services";
import { Badge } from "@material-ui/core";
import StaffContext from "../../context/staffContext";
import { PositionForm, RightManageCard, UnitForm } from "../../view-components";
import AppContext from "../../context/appContext";
import { CardList } from "../../components/lists";
import { MULTIPLE_NESTED_SELECTION_MODE } from "../../utils/constants";
import { existsInArray, removeFromArray } from "../../utils/objectArray";
import { updateSelection } from "../../utils/itemsSelections";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function show(props) {
    const { slug } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showRights, setShowRights] = useState(false);

    const [expandedRights, setExpandedRights] = useState([]);
    const [selectedRights, setSelectedRights] = useState([]);
    const [rightsSelectionMode, setRightsSelectionMode] = useState(
        MULTIPLE_NESTED_SELECTION_MODE
    );

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
                                // <Badge
                                //     badgeContent={t("alerts.deleted")}
                                //     color="error"
                                // />
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
            <div className="tool-links horizontal">
                <button
                    className="tool-link"
                    onClick={() => {
                        setSelectedRights([...item.rights]);
                        setExpandedRights([]);
                        setShowRights(true);
                    }}
                >
                    {t("tools.rightsManagement")}
                </button>
            </div>
            <FormDialog
                show={showRights}
                onClose={closeRightsDialog}
                title={t("forms.selectRights")}
                dialogProps={{
                    maxWidth: "sm"
                }}
                formComponent={
                    <CardList
                        dataService={GetRightList}
                        dataRequestParams={{ group: "owned" }}
                        cardComponent={<RightManageCard />}
                        entryOperations={[]}
                        selection={{
                            handler: handleRightsSelect,
                            data: selectedRights,
                            className: ""
                        }}
                        expansion={{
                            handler: handleRightsExpand,
                            data: expandedRights,
                            expandableItemsField: "childs",
                            className: "card-operation-btn",
                            icon: <ExpandMoreIcon />
                        }}
                    />
                }
            />
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
        setSelectedRights([]);
        setShowRights(false);
    }

    function handleRightsExpand(item) {
        // console.log("handle EXPAND called", item);
        if (existsInArray(expandedRights, "id", item.id))
            setExpandedRights(
                // expandedRights.filter(value => item.id != value.id)
                removeFromArray(expandedRights, "id", [item.id])
            );
        else {
            setExpandedRights([...expandedRights, item]);
            // setExpandedItems([item.id]);
        }
    }

    function handleRightsSelect(item) {
        // console.log("handle select called for", item);
        setSelectedRights(
            updateSelection(selectedRights, item, rightsSelectionMode)
        );
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
