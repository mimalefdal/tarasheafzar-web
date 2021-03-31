import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton } from "../../components/buttons";
import { Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog, Loading } from "../../components/feedback";
import { ApiClient, GetUnit } from "../../services";
import { Badge } from "@material-ui/core";
import StaffContext from "../../context/staffContext";
import { UnitForm } from "../../view-components";
import { SimpleList } from "../../components/lists";

function show(props) {
    const { slug } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const token = useContext(StaffContext).token;

    useEffect(() => {
        if (location.state) {
            console.log("show", location.state.item);

            setItem(location.state.item);
            setReady(true);
        } else {
            // console.log(location);
            GetUnit(
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
        // item && console.log("showUnit", item.positions);
    }, [item]);

    return (
        <>
            <PageHeaderBar className="view-header">
                {ready ? (
                    <Title
                        className="view-title"
                        // pretitle={t("labels.Unit")}
                        pretitle={t("tools.unitsManagement")}
                        posttail={
                            item.holder_id ? item.holder.full_title : null
                        }
                        title={
                            item.short_title
                                ? item.short_title
                                : item.type + " " + item.title
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
            {ready && (
                <>
                    <SimpleList
                        title={t("labels.positions")}
                        items={item.positions}
                        dataField="short_title"
                        itemType="position"
                    />
                    <SimpleList
                        title={t("labels.staffof", {
                            block: t("labels.block")
                        })}
                        items={item.directcrew}
                        dataField="fullname"
                        itemType="staff_s"
                        linkPattern="/staff/:personnel_id"
                    />
                    <SimpleList
                        title={t("labels.staffof", {
                            block: t("labels.subset")
                        })}
                        items={item.subsetCrew}
                        dataField="fullname"
                        itemType="staff_s"
                        linkPattern="/staff/:personnel_id"
                    />
                </>
            )}
            <FormDialog
                show={showEdit}
                onClose={closeEditForm}
                title="ویرایش"
                formComponent={<UnitForm preset="edit" item={item} />}
            />
        </>
    );

    function displayEditForm() {
        setShowEdit(true);
    }

    function closeEditForm() {
        setReady(false);
        setShowEdit(false);
        GetUnit({ id: item.id }, token, getResponse, getError);
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
