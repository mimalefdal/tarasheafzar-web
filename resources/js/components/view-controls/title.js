import React from "react";

function viewControl(props) {
    return (
        <div className={props.className}>
            <div>
                {props.pretitle && (
                    <div className="title-pretitle">{props.pretitle}</div>
                )}
                <div className="title-text">
                    {props.pretail && (
                        <span className="text-tail pre">{props.pretail}</span>
                    )}{" "}
                    <span className="">{props.title}</span>{" "}
                    {props.posttail && (
                        <span className="text-tail post">{props.posttail}</span>
                    )}{" "}
                </div>
                {props.posttitle && (
                    <div className="title-posttitle">{props.posttitle}</div>
                )}
            </div>
            <div style={{ flexGrow: 1 }}></div>
            <div className="btn-set">{props.btnSet}</div>
        </div>
    );
}

export default viewControl;
