// src/utils/formatDate.js
export const formatDateTime = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString();
  };
  