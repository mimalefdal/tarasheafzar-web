import React, { useState } from "react";
import FilterListIcon from "@material-ui/icons/FilterList";

function _control({ options, callback, defaultOptionIndex, ...props }) {
    const [activeIndex, setActiveIndex] = useState(defaultOptionIndex);

    return (
        <div
            className={
                "list-filter-box flex row" +
                (props.className && " " + props.className)
            }
        >
            <FilterListIcon />

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
                    {option.label}
                </div>
            ))}
        </div>
    );
}

export default _control;
