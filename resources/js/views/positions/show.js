import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton } from "../../components/buttons";
import { Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog, Loading } from "../../components/feedback";
import { ApiClient, GetPosition } from "../../services";
import { Badge } from "@material-ui/core";
import StaffContext from "../../context/staffContext";
import { PositionForm, UnitForm } from "../../view-components";
import AppContext from "../../context/appContext";

function show(props) {
    const { slug } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
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
        // item && console.log('show', item);
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
