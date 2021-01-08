import React, {
    Component,
    Fragment,
    useContext,
    useEffect,
    useState
} from "react";
import { ApiClient } from "../../services";
import { RightEntry, ListTitle } from "../../components/list-controls";
import "../../styles/lists.css";
import { t } from "../../utils";
import Loading from "../../../../public/image/loading.png";
import StaffContext from "../../context/staffContext";
import { StaffTable } from "..";

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
