import React, {
    cloneElement,
    Fragment,
    useContext,
    useEffect,
    useState
} from "react";
import { ApiClient } from "../../services";
import "../../styles/lists.css";
import StaffContext from "../../context/staffContext";
import { OperationEntry } from "../tables";

function TableListBase({
    type = "basic",
    dataUrl,
    tableComponent,
    entryComponent = null,
    tableMap,
    entryOperations,
    ...props
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = useContext(StaffContext).token;
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    useEffect(() => {
        ApiClient.get(dataUrl, {
            headers: headers
        })
            .then(response => {
                // console.info("TablelistBase", response.data);
                if (response.data.data) setItems(response.data.data);
                else setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response);
                setLoading(false);
            });
    }, []);

    return (
        <div className="list-container ">
            <div className="list-body  ">
                {cloneElement(tableComponent, {
                    items: items,
                    loading: loading,
                    tableMap: tableMap,
                    entryComponent: entryComponent,
                    entryOperations: entryOperations
                })}
                {/* <RightsTable items={items} loading={loading} /> */}
            </div>
        </div>
    );
}

export default TableListBase;
