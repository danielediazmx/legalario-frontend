import axios from "axios";
import store from './store/index'
let token = store.getters["auth/user_token"];

axios.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)