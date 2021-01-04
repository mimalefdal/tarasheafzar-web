import React, {
    Component,
    Fragment,
    useContext,
    useEffect,
    useState
} from "react";
import { ApiClient } from "../../services";
import { RightEntry, ListTitle } from "../list-controls";
import "../../styles/lists.css";
import { t } from "../../utils";
import { RightsTable, StaffTable } from "../tables/index.js";
import Loading from "../../../../public/image/loading.png";
import StaffContext from "../../context/staffContext";

function List(props) {
    const [ready, setReady] = useState(false);
    const [items, setItems] = useState();
    const token = useContext(StaffContext).token;

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    useEffect(() => {
        ApiClient.get("/staff", {
            headers: headers
        })
            .then(response => {
                // console.log(response.data);
                const staff = response.data;
                setItems(staff);
                setReady(true);
            })
            .catch(error => {
                console.log(error.response);
            });
    }, []);

    return (
        <div className="list-container ">
            <div className="list-body  ">
                <StaffTable
                    items={items}
                    loading={!ready}
                    selectionMode="none"
                    className="general-shadow"
                />
            </div>
        </div>
    );
}

export default List;
