export const formatDateToISO = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD" formatına dönüştürür
};

export const formatDateToLocal = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Yerel tarih formatına dönüştürür
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Yerel tarih ve saat formatına dönüştürür
};
