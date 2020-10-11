import React, { Component } from "react";
import "../../../../public/css/contact-card.css";
import "../../../../public/css/contact-item.css";
import sendIcon from "../../../../public/image/send.svg";
import loadingIcon from "../../../../public/image/loading.png";
import data from "../../../../storage/app/public/company.json";

export default class ContactCard extends Component {
    componentDidMount() {
        const script = document.createElement("script");

        script.src = "/js/create-message.js";
        script.async = true;

        document.body.appendChild(script);
    }

    render() {
        const contacts = data.contatcs;
        // console.log(contacts);
        return (
            <div>
                <div className="main-container">
                    <div className="card-box contact-form">
                        <div className="title form-title">
                            برای ما پیام بگذارید
                            <div id="callyou"> ما با شما تماس می‌گیریم</div>
                        </div>
                        <div id="sent-alert" onClick={this.hideSentAlert}>
                            <div
                                id="messageSuccessSender"
                                className="response alert alert-success"
                            >
                                نام فرستنده
                            </div>
                            <div
                                id="messageSuccess"
                                className="response alert alert-success"
                            ></div>
                        </div>

                        <div id="failure-alert" onClick={this.hideSentAlert}>
                            <div
                                id="messageFailure"
                                className="response alert alert-failure"
                            ></div>
                        </div>

                        <div className="form-body">
                            <form className="message-form" id="message-form">
                                <div className=" input-block">
                                    <label>
                                        نام <span className="shoma">شما</span>{" "}
                                    </label>
                                    <input
                                        id="name"
                                        name="sender"
                                        type="text"
                                    />
                                </div>
                                <div
                                    id="sender-error"
                                    className="alert alert-danger"
                                ></div>

                                <div className="input-block">
                                    <label>
                                        تماس <span className="shoma">شما</span>
                                    </label>
                                    <input
                                        id="contact"
                                        name="contact"
                                        type="text"
                                        placeholder="ایمیل، موبایل یا تلفن ثابت"
                                    />
                                </div>
                                <div
                                    id="contact-error"
                                    className="alert alert-danger"
                                ></div>

                                <div className="input-block">
                                    <label>
                                        پیام <span className="shoma">شما</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                    ></textarea>
                                </div>
                                <div
                                    id="message-error"
                                    className="alert alert-danger"
                                ></div>

                                <div
                                    className="btn submit-btn"
                                    id="submitBtn"
                                    onClick={this.trySendMessage}
                                >
                                    <p id="sendBtnText">ارسال</p>
                                    <img
                                        src={loadingIcon}
                                        alt="loading"
                                        id="sendBtnLoading"
                                        style={{ display: "none" }}
                                    />
                                    <img
                                        src={sendIcon}
                                        alt="loading"
                                        id="sendBtnIcon"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card-box contact-info">
                        <div className=" title contacts-title ">
                            با ما تماس بگیرید
                            <div id="callyou"> در خدمت شما هستیم</div>
                        </div>
                        <div className="contacts-body">
                            {contacts.map((item, key) => (
                                <div key={key} className="contact-item-body">
                                    <div className="contact-icon"></div>
                                    <div className="contact-data">
                                        <div className="contact-main-data">
                                            {item["main-data"]}
                                        </div>
                                        <div className="contact-comment">
                                            {item.comment}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="socials">
                            <div className="social-item"></div>
                            <div className="social-item">
                                <svg
                                    className="social-icon"
                                    viewBox="0 0 512 512"
                                    width="512pt"
                                    height="512pt"
                                >
                                    <path
                                        d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
                   c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
                   c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
                   c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
                   c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
                   c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
                   C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
                   C480.224,136.96,497.728,118.496,512,97.248z"
                                    />
                                </svg>
                            </div>
                            <div className="social-item">
                                <svg
                                    className="social-icon"
                                    viewBox="0 0 512 512"
                                    width="512pt"
                                    height="512pt"
                                >
                                    <path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm-74.390625 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0" />
                                </svg>
                            </div>
                            <div className="social-item">
                                <svg
                                    className="social-icon"
                                    viewBox="0 0 512 512"
                                    width="512pt"
                                    height="512pt"
                                >
                                    <path d="m437 0h-362c-41.351562 0-75 33.648438-75 75v362c0 41.351562 33.648438 75 75 75h151v-181h-60v-90h60v-61c0-49.628906 40.371094-90 90-90h91v90h-91v61h91l-15 90h-76v181h121c41.351562 0 75-33.648438 75-75v-362c0-41.351562-33.648438-75-75-75zm0 0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    hideSentAlert() {
        hideAllAlerts();
    }

    trySendMessage() {
        sendNewMessage();
    }
}
