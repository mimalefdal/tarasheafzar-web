import React, { useState } from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import { ListOption, OptionsBar } from ".";

function _control({ options, callback, defaultOptionIndex, ...props }) {
    const [activeIndex, setActiveIndex] = useState(defaultOptionIndex);

    return (
        <OptionsBar
            className={
                "list-options-box flex row" +
                (props.className && " " + props.className)
            }
        >
            <FilterListIcon />
            <div className="filler"></div>
            {options.map((option, index) => (
                <ListOption
                    key={index}
                    option={option}
                    active={activeIndex == index}
                    onClick={() => {
                        setActiveIndex(index);
                        callback({ value: option.value, index: index });
                    }}
                />
            ))}
        </OptionsBar>
    );
}

export default _control;
