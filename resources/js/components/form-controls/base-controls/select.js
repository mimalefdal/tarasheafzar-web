import React from "react";
import "../../../styles/select.css";

function CustumeSelect(props) {
    return (
        <div className="select-box">
            <div className="select-box__current" tabindex="1">
                <div className="select-box__value">
                    <input
                        checked="checked"
                        className="select-box__input"
                        id="0"
                        name="Ben"
                        type="radio"
                        value="1"
                    />
                    <p className="select-box__input-text">Cream</p>
                </div>
                <div className="select-box__value">
                    <input
                        className="select-box__input"
                        id="1"
                        name="Ben"
                        type="radio"
                        value="2"
                    />
                    <p className="select-box__input-text">خانم</p>
                </div>
                <div className="select-box__value">
                    <input
                        className="select-box__input"
                        id="2"
                        name="Ben"
                        type="radio"
                        value="3"
                    />
                    <p className="select-box__input-text">Milk</p>
                </div>
                <div className="select-box__value">
                    <input
                        className="select-box__input"
                        id="3"
                        name="Ben"
                        type="radio"
                        value="4"
                    />
                    <p className="select-box__input-text">Honey</p>
                </div>
                <div className="select-box__value">
                    <input
                        className="select-box__input"
                        id="4"
                        name="Ben"
                        type="radio"
                        value="5"
                    />
                    <p className="select-box__input-text">خانم</p>
                </div>
                <img
                    alt="Arrow Icon"
                    aria-hidden="true"
                    className="select-box__icon"
                    src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                />
            </div>
            <ul className="select-box__list">
                <li>
                    <label
                        aria-hidden="aria-hidden"
                        className="select-box__option"
                        htmlFor="0"
                    >
                        Cream
                    </label>
                </li>
                <li>
                    <label
                        aria-hidden="aria-hidden"
                        className="select-box__option"
                        htmlFor="1"
                    >
                        Cheese
                    </label>
                </li>
                <li>
                    <label
                        aria-hidden="aria-hidden"
                        className="select-box__option"
                        htmlFor="2"
                    >
                        Milk
                    </label>
                </li>
                <li>
                    <label
                        aria-hidden="aria-hidden"
                        className="select-box__option"
                        htmlFor="3"
                    >
                        Honey
                    </label>
                </li>
                <li>
                    <label
                        aria-hidden="aria-hidden"
                        className="select-box__option"
                        htmlFor="4"
                    >
                        خانم
                    </label>
                </li>
            </ul>
        </div>
    );
}

export default CustumeSelect;
