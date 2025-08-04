import axios from "axios"

export const BASE_URL = "http://localhost:8000"

export const setToken = (token) => localStorage.setItem("token", token)
export const getToken = () => localStorage.getItem("token")
export const removeToken = () => localStorage.removeItem("token")

export const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    (config) => {
        const token = getToken()

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)



