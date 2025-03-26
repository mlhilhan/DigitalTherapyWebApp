import api from "./axios";

export const emotionalStateAPI = {
  getAllEntries: async () => {
    const response = await api.get("/EmotionalStates/GetEmotionalStates");
    return response.data;
  },

  getEntryById: async (id) => {
    const response = await api.get(`/EmotionalStates/GetEmotionalStates/${id}`);
    return response.data;
  },

  getEntriesByDateRange: async (startDate, endDate) => {
    const response = await api.get(
      `/EmotionalStates/GetEmotionalStates?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },

  getBookmarkedEntries: async () => {
    const response = await api.get("/EmotionalStates/GetBookmarked");
    return response.data;
  },

  getStatistics: async (startDate, endDate) => {
    let url = "/EmotionalStates/GetStatistics";
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  createEntry: async (entryData) => {
    const response = await api.post(
      "/EmotionalStates/CreateEmotionalState",
      entryData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  updateEntry: async (id, entryData) => {
    const response = await api.put(
      `/EmotionalStates/UpdateEmotionalState/${id}`,
      entryData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  deleteEntry: async (id) => {
    const response = await api.delete(
      `/EmotionalStates/DeleteEmotionalState/${id}`
    );
    return response.data;
  },

  toggleBookmark: async (id) => {
    const response = await api.patch(`/EmotionalStates/${id}/ToggleBookmark`);
    return response.data;
  },
};
