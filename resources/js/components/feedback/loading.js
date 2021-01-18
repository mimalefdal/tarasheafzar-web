import React from "react";
import Ball from "../../../../public/image/loading-ball.svg";
import Spin from "../../../../public/image/loading-spin.svg";
import Roll from "../../../../public/image/loading-roll.svg";
import { ReactSVG } from "react-svg";

function Control({ type = Roll, preset = "default", ...props }) {
    let Loading = type;
    let height = false;
    let width = false;
    let fill = "none"; // set for Roll default
    let stroke = "#3490dc"; // set for Roll default

    // TODO : implement presets for loading
    const presets = {
        default: {},
        onDarkTitle: {}
    };

    switch (type) {
        case "spin":
            Loading = Spin;
            height = props.height ? props.height : "50px";
            width = props.width ? props.width : "50px";
            fill = props.color ? props.color : stroke;
            stroke = "none";
            break;

        case "ball":
            Loading = Ball;
            height = props.height ? props.height : "25px";
            width = props.width ? props.width : "25px";
            fill = props.color ? props.color : stroke;
            stroke = "none";

            break;

        default:
            height = props.height && props.height;
            width = props.width && props.width;
            stroke = props.color ? props.color : stroke;
            break;
    }
    return (
        <ReactSVG
            className={"loading " + props.className}
            src={Loading}
            alt="Loading"
            style={{
                ...props.style,
                height: height ? height : "100px",
                width: width ? width : "100px",
                fill: fill,
                stroke: stroke
            }}
        />
    );
}

export default Control;
