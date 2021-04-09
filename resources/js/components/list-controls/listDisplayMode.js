import React, { useState } from "react";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

function _control({ options, callback, defaultOptionIndex = 0, ...props }) {
    const [activeIndex, setActiveIndex] = useState(defaultOptionIndex);

    // console.log("listDisplayMode", options);
    return (
        <div
            className={
                "list-options-box flex row" +
                (props.className && " " + props.className)
            }
        >
            <div className="list-options-title-box">
                <ViewModuleIcon />
                <div className="list-options-title">شیوه نمایش</div>
            </div>
            <div className="filler"></div>
            {options.map((option, index) => (
                <div
                    key={index}
                    className={
                        "list-option" + (activeIndex == index ? " active" : "")
                    }
                    onClick={() => {
                        setActiveIndex(index);
                        callback({ value: option.value, index: index });
                    }}
                >
                    {option.icon ? option.icon : option.label}
                </div>
            ))}
        </div>
    );
}

export default _control;
