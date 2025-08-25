// src/services/authService.js
import { api } from "./api";

export const postLogin = (payload) => api.post("/login", payload);
export const postRegister = (payload) => api.post("/register", payload);
export const postLogout = () => api.post("/logout");
export const getMe = () => api.get("/user");
