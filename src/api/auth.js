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
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await api.post("/Auth/Logout", {
      Token: accessToken,
    });
    return response.data;
  },

  refreshToken: async (accessToken, refreshToken) => {
    const response = await api.post("/Auth/RefreshToken", {
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/Auth/ForgotPassword", { email });
    return response.data;
  },
};

export default authAPI;
