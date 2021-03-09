import React from "react";

function viewControl({
    title,
    pretitle,
    pretail,
    posttitle,
    posttail,
    btnSet,
    tags,
    ...props
}) {
    // console.log("Title->tags:", tags);
    return (
        <div className={props.className}>
            <div>
                {pretitle && <div className="title-pretitle">{pretitle}</div>}
                <div className="title-text">
                    {pretail && (
                        <span className="text-tail pre">{pretail}</span>
                    )}{" "}
                    <span className="">{title}</span>{" "}
                    {posttail && (
                        <span className="text-tail post">{posttail}</span>
                    )}{" "}
                </div>
                {posttitle && (
                    <div className="title-posttitle">{posttitle}</div>
                )}
            </div>

            <div style={{ flexGrow: 1 }}></div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {tags && <div className="flex tag-set">{tags}</div>}
                {btnSet && <div className="flex btn-set">{btnSet}</div>}
            </div>
        </div>
    );
}

export default viewControl;
