import axios from "axios";

let client_local = axios.create({
    baseURL: "http://api.localhost:8000",
    withCredentials: true
});

let client_production = axios.create({
    baseURL: "https://api.tarasheafzar.ir",
    withCredentials: true
});

const apiClient =
    sessionStorage.getItem("ENV") == "production"
        ? client_production
        : client_local;

export default apiClient;
