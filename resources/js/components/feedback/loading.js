import React from "react";
import Ball from "../../../../public/image/loading-ball.svg";
import Spin from "../../../../public/image/loading-spin.svg";
import Roll from "../../../../public/image/loading-roll.svg";
import { ReactSVG } from "react-svg";

function Control({ type = Roll, preset = "default", size = null, ...props }) {
    let Loading = type;
    let height = false;
    let width = false;
    let fill = "none"; // set for Roll default
    let stroke = "#3490dc"; // set for Roll default

    // TODO : implement wrapping for display inside tables
    // props.columns && console.log("Loadind", props.columns);
    // let ContainerTag = props.columns ? "div" : "div";

    if (size) {
        props.height = size;
        props.width = size;
    }
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
        // <ContainerTag id="loading-container">
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
        // </ContainerTag>
    );
}

export default Control;
