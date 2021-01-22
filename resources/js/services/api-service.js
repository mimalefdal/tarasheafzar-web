import axios from "axios";

const client_local = axios.create({
    baseURL: "http://api.localhost:8000",
    withCredentials: true
});

const client_production = axios.create({
    baseURL: "https://api.tarasheafzar.ir",
    withCredentials: true
});

const client =
    sessionStorage.getItem("ENV") == "production"
        ? client_production
        : client_local;

export default client;
