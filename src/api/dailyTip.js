import api from "./axios";

export const dailyTipAPI = {
  getCategories: async (languageCode = "en") => {
    const response = await api.get(
      `/DailyTips/GetCategories?languageCode=${languageCode}`
    );
    return response.data;
  },

  getAllTips: async (languageCode = "en") => {
    const response = await api.get(
      `/DailyTips/GetAllTips?languageCode=${languageCode}`
    );
    return response.data;
  },

  getTipsByCategory: async (categoryKey, languageCode = "en") => {
    const response = await api.get(
      `/DailyTips/GetTipsByCategory/${categoryKey}?languageCode=${languageCode}`
    );
    return response.data;
  },

  getTipById: async (id, languageCode = "en") => {
    const response = await api.get(
      `/DailyTips/GetTipById/${id}?languageCode=${languageCode}`
    );
    return response.data;
  },

  getTipOfTheDay: async (languageCode = "en") => {
    const response = await api.get(
      `/DailyTips/GetTipOfTheDay?languageCode=${languageCode}`
    );
    return response.data;
  },

  getBookmarkedTips: async (languageCode = "en") => {
    const response = await api.get(
      `/DailyTips/GetBookmarkedTips?languageCode=${languageCode}`
    );
    return response.data;
  },

  toggleBookmark: async (id) => {
    const response = await api.post(`/DailyTips/ToggleBookmark/${id}`);
    return response.data;
  },

  createTip: async (tipData) => {
    const response = await api.post("/DailyTips/CreateTip", tipData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post("/DailyTips/CreateCategory", categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  updateTip: async (id, tipData) => {
    const response = await api.put(`/DailyTips/UpdateTip/${id}`, tipData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(
      `/DailyTips/UpdateCategory/${id}`,
      categoryData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  deleteTip: async (id) => {
    const response = await api.delete(`/DailyTips/DeleteTip/${id}`);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/DailyTips/DeleteCategory/${id}`);
    return response.data;
  },
};
