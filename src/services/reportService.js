// src/services/reportService.js
import { api } from "./api";

export const getReports = () => api.get("/reports");
export const getReportsDaily = () => api.get("/reports/daily");
export const getReportsUser = (id) => api.get(`/reports/user/${id}`);
export const getReportsMe = () => api.get("/reports/me");
