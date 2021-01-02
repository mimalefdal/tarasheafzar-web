import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton } from "../../components/buttons";
import { FormLoadingData, FormTitle } from "../../components/form-controls";
import { BranchForm } from "../../components/forms";
import { Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog } from "../../components/feedback";
import { ApiClient, ApiHeaders } from "../../services";
import { Badge } from "@material-ui/core";

function show(props) {
    let { slug } = useParams();
    let location = useLocation();
    let history = useHistory();
    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    // console.log(item);

    useEffect(() => {
        if (location.state) {
            setItem(location.state.item);
            setReady(true);
        } else {
            console.log(location);

            ApiClient.get("branch", {
                headers: ApiHeaders,
                params: { slug: slug }
            })
                .then(response => {
                    console.log(response);
                    setItem(response.data.data);
                    setReady(true);
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }, []);
    return (
        <div className="page-content responsive-inner-width">
            <PageHeaderBar className="view-header">
                {ready ? (
                    <Title
                        className="view-title"
                        pretitle={t("labels.branch")}
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
                    <p style={{ color: "white", fontSize: "12px" }}>
                        در حال بارگذاری
                    </p>
                )}
            </PageHeaderBar>
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

        ApiClient.get("branch", {
            headers: ApiHeaders,
            params: { id: item.id }
        })
            .then(response => {
                console.log(response);

                let responseItem = response.data.data;
                if (item.slug != responseItem.slug) {
                    history.replace(
                        swapUrlTail(
                            history.location.pathname,
                            responseItem.slug
                        )
                    );
                }
                setItem(response.data.data);
                setReady(true);
            })
            .catch(error => {
                console.log(error.response);
            });
    }
}

export default show;
