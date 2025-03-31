import api from "./axios";

export const therapyChatAPI = {
  // AI terapi oturumu başlat
  startSession: async (forceNew = false) => {
    console.log("API call with payload:", { forceNew });
    const response = await api.post("/TherapyChat/StartSession", { forceNew });
    console.log("API response:", response.data);
    return response.data;
  },

  // Mesaj gönder ve AI yanıtını al
  sendMessage: async (message, sessionId) => {
    const response = await api.post("/TherapyChat/SendMessage", {
      message,
      sessionId,
    });
    return response.data;
  },

  // Oturumları listele
  getSessions: async () => {
    const response = await api.get("/TherapyChat/GetSessions");
    return response.data;
  },

  // Belirli bir oturumdaki mesajları getir
  getMessages: async (sessionId) => {
    const response = await api.get(`/TherapyChat/GetMessages/${sessionId}`);
    return response.data;
  },

  // Oturumu sonlandır
  endSession: async (sessionId) => {
    const response = await api.post(`/TherapyChat/EndSession/${sessionId}`);
    return response.data;
  },

  // Aktif oturumu değiştir
  // activateSession: async (sessionId) => {
  //   const response = await api.post(
  //     `/TherapyChat/ActivateSession/${sessionId}`
  //   );
  //   return response.data;
  // },
  activateSession: async (sessionId) => {
    const response = await api.post(
      `/TherapyChat/ActivateSession/${sessionId}`
    );
    return response.data;
  },
};
