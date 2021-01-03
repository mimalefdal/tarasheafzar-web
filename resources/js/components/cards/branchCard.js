import React, { useState } from "react";
import PropTypes from "prop-types";
import { data, error } from "jquery";
import "../../styles/cards.css";
import { useHistory, useRouteMatch } from "react-router-dom";
import { DeleteButton, ViewButton } from "../buttons";
import { ApiClient } from "../../services";
import { ConfirmDialog } from "../feedback";
import { t } from "../../utils";

branchCard.propTypes = {
    item: PropTypes.any
};

function branchCard({ item, ...props }) {
    // console.log("from branch card", item);

    const history = useHistory();
    const lang = sessionStorage.getItem("currentLanguage");
    let match = useRouteMatch();

    let [askToConfirm, setAskToConfirm] = useState(false);

    function showItemView() {
        history.push({
            pathname: `${match.path}/${item.slug}`,
            state: {
                item: item
            }
        });
    }

    function onDelete(confirm) {
        // console.log("branch Card -> onDelete : confirmed = ", confirm);
        setAskToConfirm(false);

        if (confirm) {
            tryDelete();
        } else {
        }
    }

    function tryDelete() {
        ApiClient.post(
            "branch/remove",
            { item: item },
            {
                headers: {
                    Accept: "application/json",
                    Authorization:
                        "Bearer " + sessionStorage.getItem("StaffAccessToken")
                }
            }
        )
            .then(response => {
                console.log(response);
                history.replace(history.location.pathname);
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    const showTarget = {
        pathname: `${match.path}/${item.slug}`,
        state: {
            item: item
        }
    };
    return (
        <div className="card-container flex column center">
            <div className="card-title">
                {item.type} {item.title}
                {lang != "en" && (
                    <div className="global" style={{ fontSize: "10px" }}>
                        {item.title_en} {item.type_en}
                    </div>
                )}
            </div>

            <div className="btn-set card-btn-set">
                <ViewButton
                    className="card-operation-btn"
                    target={showTarget}
                />
                <DeleteButton
                    className="card-operation-btn"
                    onClick={() => setAskToConfirm(true)}
                />
            </div>

            <ConfirmDialog
                show={askToConfirm}
                onClose={onDelete}
                title={t("alerts.confirm")}
                content={t("expressions.sureDelete")}
                item={item.type + " " + item.title}
            />
        </div>
    );
}

export default branchCard;
