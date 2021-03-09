import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { FormTitle } from "../../components/form-controls";
import StaffContext from "../../context/staffContext";
import { GetStaff } from "../../services";
import { t } from "../../utils";
import { StaffRegisterForm } from "../../view-components";

function _edit(props) {
    const { personnel_id } = useParams();
    const location = useLocation();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const token = useContext(StaffContext).token;

    useEffect(() => {
        // if (location.state) {
        //     console.log(location.state);
        //     setItem(location.state.item);
        //     setReady(true);
        // } else {
        GetStaff(
            { mode: "editByManager", personnel_id: personnel_id },
            token,
            response => {
                // console.log(response);
                if (response.data.data) setItem(response.data.data);
                else setItem(response.data);
                setReady(true);
            },
            failure => {
                console.log(failure);
            }
        );
        // }
    }, []);

    useEffect(() => {
        // item && console.log("edit", item);
    }, [item]);
    return (
        <>
            <PageHeaderBar className="form-header">
                <FormTitle className="" title={t("forms.editStaff")} />
            </PageHeaderBar>
            <div className="main-content general-shadow">
                {ready && (
                    <StaffRegisterForm
                        preset="edit"
                        item={item}
                        // showAlert={
                        //     status.requestedStatus
                        //         ? {
                        //               show: true,
                        //               type: "warning",
                        //               message: status.message
                        //           }
                        //         : null
                        // }
                    />
                )}
            </div>
        </>
    );
}

export default _edit;
