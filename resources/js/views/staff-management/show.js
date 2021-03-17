import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { PageHeaderBar } from "../../components";
import { EditButton, SuspenseTogglerButton } from "../../components/buttons";
import { SpecCard } from "../../components/cards";
import { ConfirmAndRunDialog, Loading } from "../../components/feedback";
import { Title } from "../../components/view-controls";
import AppContext from "../../context/appContext";
import StaffContext from "../../context/staffContext";
import { GetStaff, ToggleSuspendStaff } from "../../services";
import { t } from "../../utils";
import { StaffManagementInformation } from "../../view-components";

function _show(props) {
    const { personnel_id } = useParams();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const token = useContext(StaffContext).token;
    const locale = useContext(AppContext).locale;

    const [suspendRequest, setSuspendRequest] = useState(false);
    const [trigReload, setTrigReload] = useState(false);

    useEffect(() => {
        // if (location.state) {
        //     console.log(location.state);
        //     setItem(location.state.item);
        //     setReady(true);
        // } else {
        ready && setReady(false);
        GetStaff(
            { mode: "viewByManager", personnel_id: personnel_id },
            token,
            response => {
                console.log(response.data.data);
                if (response.data.data) setItem(response.data.data);
                else setItem(response.data);
                setReady(true);
            },
            failure => {
                console.log(failure);
            }
        );
        // }
    }, [trigReload]);

    useEffect(() => {
        // item && console.log("edit", item);
    }, [item]);

    function handleSuspend() {
        // console.log("handle SUSPEND called", item);
        // setItem(item);
        setSuspendRequest(true);
    }
    return (
        <>
            <PageHeaderBar className="view-header">
                {ready ? (
                    <Title
                        className="view-title"
                        pretitle={t("tools.staffManagement")}
                        title={item.fullname}
                        tags={
                            <>
                                {item.deleted ? (
                                    <div className="tag deleted">
                                        {t("alerts.deleted")}
                                    </div>
                                ) : null}
                                {item.suspended ? (
                                    <div className="tag suspended">
                                        {t("alerts.suspended")}
                                    </div>
                                ) : null}
                            </>
                        }
                        btnSet={
                            <SuspenseTogglerButton
                                className={
                                    "header-operation-btn " +
                                    (item.deleted ? "disabled" : "")
                                }
                                item={item}
                                onClick={handleSuspend}
                            />
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
                    {/* <StaffManagementInformation>
                        <SpecCard spec="تلیفون" value="09125700904" />
                    </StaffManagementInformation> */}
                    <StaffManagementInformation
                        preset="personal"
                        staff={item}
                        // btnSet={
                        //     <EditButton
                        //         onClick={() =>
                        //             console.log("editButton pressed")
                        //         }
                        //     />
                        // }
                    />
                    <StaffManagementInformation preset="carrier" staff={item} />
                    <StaffManagementInformation
                        preset="access"
                        staff={item}
                        title={t("labels.access_p")}
                    />
                    <StaffManagementInformation preset="crew" staff={item} />
                    <ConfirmAndRunDialog
                        dataService={ToggleSuspendStaff}
                        request={suspendRequest}
                        item={item}
                        confirmMassageAction={t("expressions.sureToggle")}
                        confirmMessageData={item && item.fullname}
                        confirmPreContent={
                            t("labels.status") + " " + t("attr.staffAccount")
                        }
                        // runProgressMessage={t("expressions.executed")}
                        onClose={updateNeeded => {
                            if (updateNeeded) setTrigReload(!trigReload);
                            setSuspendRequest(false);
                            // setItem({});
                        }}
                    />
                </>
            )}
        </>
    );
}

export default _show;
