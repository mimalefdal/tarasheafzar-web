import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { PageHeaderBar } from "../../components";
import { EditButton } from "../../components/buttons";
import { Title } from "../../components/view-controls";
import { swapUrlTail, t } from "../../utils";
import { FormDialog, Loading } from "../../components/feedback";
import { GetCompanyInfo } from "../../services";
import { Badge } from "@material-ui/core";
import StaffContext from "../../context/staffContext";
import { DepartmentForm } from "../../view-components";
import { SimpleList } from "../../components/lists";

function show(props) {
    const location = useLocation();
    const history = useHistory();

    const [item, setItem] = useState();
    const [ready, setReady] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    // console.log(item);
    const token = useContext(StaffContext).token;

    useEffect(() => {
        GetCompanyInfo(
            [],
            token,
            response => {
                console.log("Show Company Information", response.data);
                if (response.data.data) setItem(response.data.data);
                else setItem(response.data);
                setReady(true);
            },
            failure => {
                console.log(failure);
            }
        );
    }, []);

    return (
        <>
            <PageHeaderBar className="view-header">
                {ready ? (
                    <Title
                        className="view-title"
                        // pretitle={t("labels.company")}
                        pretitle={t("tools.organizationInformation")}
                        posttail=""
                        title={
                            item.full_title
                                ? item.full_title
                                : item.type + " " + item.title
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
                        title={t("labels.branches")}
                        items={item.branches}
                        dataField="full_title"
                        itemType="branchy"
                        linkPattern="/structure/branches/:slug"
                    />
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
        </>
    );
}

export default show;
