import api from "./axios";

export const authAPI = {
  login: async (UsernameOrEmail, password) => {
    const response = await api.post("/Auth/Login", {
      UsernameOrEmail,
      password,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/Auth/CreateUser", userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/Auth/Logout");
    return response.data;
  },

  refreshToken: async (accessToken, refreshToken) => {
    const response = await api.post("/Auth/RefreshToken", {
      accessToken,
      refreshToken,
    });
    return response.data;
  },
};
