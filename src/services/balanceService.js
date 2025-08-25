// src/services/balanceService.js
import { api } from "./api";

export const getMyBalance = () => api.get("/balance");
export const getBalanceById = (id) => api.get(`/balance/${id}`); // admin only
export const putTopup = (payload) => api.put("/balance/topup", payload); // bank only
export const putWithdraw = (payload) => api.put("/balance/withdraw", payload); // bank only
