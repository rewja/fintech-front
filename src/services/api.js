// src/services/api.js
import axios from "axios";
import { BASE_URL, API_PREFIX } from "../utils/constants";
import { getToken } from "../utils/auth";

export const api = axios.create({
  baseURL: `${BASE_URL}${API_PREFIX}`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
