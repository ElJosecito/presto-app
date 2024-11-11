import axios from "axios";
import { useAuthStore } from "../store/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    baseURL: "http://10.0.0.180:3000/api/",
});

instance.interceptors.request.use((config) => {

    const { token } = useAuthStore.getState();



    config.headers = {
        "auth-token": token,
    }
    return config;
});


export default instance;