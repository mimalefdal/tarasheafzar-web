import React from "react";
import Ball from "../../../../public/image/loading-ball.svg";
import Spin from "../../../../public/image/loading-spin.svg";
import Roll from "../../../../public/image/loading-roll.svg";
import { ReactSVG } from "react-svg";

function Control(props) {
    let Loading = Roll;
    var height = false;
    var width = false;
    switch (props.type) {
        case "spin":
            Loading = Spin;
            height = "50px";
            width = "50px";
            break;
        case "ball":
            Loading = Ball;
            height = "25px";
            width = "25px";
            break;
        default:
            break;
    }
    return (
        <ReactSVG
            className="loading"
            src={Loading}
            alt="Loading"
            style={{
                height: height ? height : "100px",
                width: width ? width : "100px"
            }}
        />
    );
}

export default Control;
