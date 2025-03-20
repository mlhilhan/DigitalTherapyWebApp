import api from "./axios";

export const userProfileAPI = {
  createProfile: async (profileData) => {
    const response = await api.post("/UserProfiles/Create", profileData);
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/UserProfiles/Update", profileData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/UserProfiles/GetUserProfile");
    return response.data;
  },
};
