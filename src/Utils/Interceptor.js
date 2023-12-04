import axios from "axios";
import { getToken } from "./Helper";

const instance = axios.create({
    baseURL: 'https://crms.ajcl.net:7750/api/',
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;