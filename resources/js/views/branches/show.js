import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton } from "../../components/buttons";
import { Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog, Loading } from "../../components/feedback";
import { ApiClient, GetBranch } from "../../services";
import { Badge } from "@material-ui/core";
import StaffContext from "../../context/staffContext";
import { BranchForm } from "../../view-components";
import { SimpleList } from "../../components/lists";

function show(props) {
    const { slug } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    // console.log(item);
    const token = useContext(StaffContext).token;

    useEffect(() => {
        if (location.state) {
            setItem(location.state.item);
            setReady(true);
        } else {
            // console.log(location);
            GetBranch(
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
    return (
        <div className="">
            <PageHeaderBar className="view-header">
                {ready ? (
                    <Title
                        className="view-title"
                        pretitle={t("tools.branchesManagement")}
                        title={item.type + " " + item.title}
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
                        title={t("labels.departments")}
                        items={item.departments}
                        dataField="short_title"
                        itemType="department"
                        linkPattern="/structure/departments/:slug"
                    />
                    <SimpleList
                        title={t("labels.units")}
                        items={item.units}
                        dataField="short_title"
                        itemType="unit"
                        linkPattern="/structure/units/:slug"
                    />
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
                        items={item.subsetcrew}
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
                formComponent={<BranchForm preset="edit" item={item} />}
            />
        </div>
    );

    function displayEditForm() {
        setShowEdit(true);
    }

    function closeEditForm() {
        setReady(false);
        setShowEdit(false);
        GetBranch({ id: item.id }, token, getResponse, getError);
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
