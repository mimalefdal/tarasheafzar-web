import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton } from "../../components/buttons";
import { FormLoadingData, FormTitle } from "../../components/form-controls";
import { Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog } from "../../components/feedback";
import { ApiClient, GetDepartment } from "../../services";
import { Badge } from "@material-ui/core";
import StaffContext from "../../context/staffContext";
import { DepartmentForm } from "../../view-components";

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
            GetDepartment(
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
                        pretitle={t("labels.department")}
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
                formComponent={<DepartmentForm preset="edit" item={item} />}
            />
        </div>
    );

    function displayEditForm() {
        setShowEdit(true);
    }

    function closeEditForm() {
        setReady(false);
        setShowEdit(false);
        GetDepartment(
            { id: item.id },
            token,
            getDepartmentResponse,
            getDepartmentError
        );
    }

    function getDepartmentResponse(response) {
        let responseItem = response.data.data;
        if (item.slug != responseItem.slug) {
            history.replace(
                swapUrlTail(history.location.pathname, responseItem.slug)
            );
        }
        setItem(response.data.data);
        setReady(true);
    }
    function getDepartmentError(failure) {
        console.log(failure);
    }
}

export default show;
