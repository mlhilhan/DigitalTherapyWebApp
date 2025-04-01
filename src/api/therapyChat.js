import api from "./axios";

export const therapyChatAPI = {
  startSession: async (forceNew = false) => {
    const response = await api.post("/TherapyChat/StartSession", { forceNew });
    return response.data;
  },

  sendMessage: async (message, sessionId) => {
    const response = await api.post("/TherapyChat/SendMessage", {
      message,
      sessionId,
    });
    return response.data;
  },

  getSessions: async () => {
    const response = await api.get("/TherapyChat/GetSessions");
    return response.data;
  },

  getMessages: async (sessionId) => {
    const response = await api.get(`/TherapyChat/GetMessages/${sessionId}`);
    return response.data;
  },

  endSession: async (sessionId) => {
    const response = await api.post(`/TherapyChat/EndSession/${sessionId}`);
    return response.data;
  },

  activateSession: async (sessionId) => {
    const response = await api.post(
      `/TherapyChat/ActivateSession/${sessionId}`
    );
    return response.data;
  },

  clearAllSessions: async () => {
    const response = await api.post("/TherapyChat/ClearAllAiSessions");
    return response.data;
  },

  completeSession: async (sessionId) => {
    const response = await api.post(
      `/TherapyChat/CompleteSession/${sessionId}`
    );
    return response.data;
  },

  clearAiSession: async (sessionId) => {
    const response = await api.post(`/TherapyChat/ClearAiSession/${sessionId}`);
    return response.data;
  },
};
