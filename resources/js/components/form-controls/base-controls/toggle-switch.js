import React, { useState } from "react";
import "../../../styles/toggle-switch.css";
import { t } from "../../../utils";

const Switch = ({ name, isOn, label, labelComment }, ref) => {
    const [value, setValue] = useState(false);
    isOn = value;
    return (
        <>
            <div className="input-block">
                <div className="dual-label-box">
                    <label className="text-input-label">{label}</label>
                    <label className="text-input-label text-input-label-comment">
                        {labelComment}
                    </label>
                </div>

                <div className="input-with-error-box">
                    <input
                        name={name}
                        className="react-switch-checkbox"
                        id={`react-switch-new`}
                        checked={isOn}
                        onChange={() => {
                            setValue(!value);
                        }}
                        type="checkbox"
                        ref={ref}
                    />
                    <label
                        style={{
                            background: isOn && "#3490dc",
                            color: "white",
                            justifyContent: isOn ? "flex-end" : "flex-start"
                        }}
                        className="react-switch-label"
                        htmlFor={`react-switch-new`}
                    >
                        <span className={`react-switch-button`} />
                        <span>
                            {" "}
                            {isOn ? t("labels.active") : t("labels.deactive")}
                        </span>
                    </label>
                </div>
            </div>
        </>
    );
};

export default React.forwardRef(Switch);
