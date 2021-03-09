import React from "react";
import Ball from "../../../../public/image/loading-ball.svg";
import Spin from "../../../../public/image/loading-spin.svg";
import Roll from "../../../../public/image/loading-roll.svg";

function Control(props) {
    let Loading = Roll;
    switch (props.type) {
        case "spin":
            Loading = Spin;
            break;
        case "ball":
            Loading = Ball;
            break;
        default:
            break;
    }
    return (
        <tr>
            <td colSpan={props.columns}>
                <img
                    src={Loading}
                    alt="Loading"
                    style={{
                        height: "50px",
                        width: "50px"
                    }}
                />
            </td>
        </tr>
    );
}

export default Control;
