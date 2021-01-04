import React from "react";
import { currentLang, t } from "../../../utils";
import { EditButton, DeleteButton, ViewButton } from "../../buttons";

function Entry({ item, ...props }) {
    console.log(item);

    let titles;
    if (item.position_id != null) titles = JSON.parse(item.position.title);

    return (
        <tr className="">
            <td>{item.id}</td>
            <td className="">{item.personnel_id}</td>
            <td className="">
                {item.firstname} {item.lastname}
            </td>
            <td className="">
                {item.position_id != null ? (
                    <div>
                        <p>{titles[currentLang()]}</p>
                        <p style={{ fontSize: "8px" }}></p>
                    </div>
                ) : (
                    "-"
                )}
            </td>
            <td className=""> </td>

            <td className="">
                <div className="table-row-btn-set">
                    <ViewButton
                        className={"table-operation-icon-btn "}
                        target={"staff/" + item.username}
                    />
                    <EditButton
                        className={"table-operation-icon-btn "}
                        target={"staff/" + item.username + "/edit"}
                    />
                    <DeleteButton
                        className={"table-operation-icon-btn "}
                        target="#"
                    />
                </div>
            </td>
        </tr>
    );
}

export default Entry;
