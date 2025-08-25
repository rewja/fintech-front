// src/services/transaksiService.js
import { api } from "./api";

export const getTransactions = () => api.get("/transactions");
export const getTransaction = (id) => api.get(`/transactions/${id}`);
/**
 * type: 'topup' | 'purchase'
 * For 'topup': { type: 'topup', amount }
 * For 'purchase': { type: 'purchase', to_user_id, items: [{product_id, qty}] }
 */
export const createTransaction = (payload) => api.post("/transactions", payload);
