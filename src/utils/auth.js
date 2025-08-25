// src/utils/auth.js
const TOKEN_KEY = "token";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const dashboardByRole = (role) => {
  switch (role) {
    case "admin": return "/admin/dashboard";
    case "bank": return "/bank/dashboard";
    case "canteen":
    case "bc": return "/canteen/dashboard";
    case "student":
    default: return "/student/dashboard";
  }
};
