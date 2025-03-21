import api from "./axios";

export const profileAPI = {
  // Hasta profil metodları
  getPatientProfile: async (userId) => {
    const response = await api.get(`/Profiles/Patient/${userId}`);
    return response.data;
  },

  updatePatientProfile: async (userId, profileData) => {
    const response = await api.put(`/Profiles/Patient/${userId}`, profileData);
    return response.data;
  },

  // Psikolog profil metodları
  getPsychologistProfile: async (userId) => {
    const response = await api.get(`/Profiles/Psychologist/${userId}`);
    return response.data;
  },

  updatePsychologistProfile: async (userId, profileData) => {
    const response = await api.put(
      `/Profiles/Psychologist/${userId}`,
      profileData
    );
    return response.data;
  },

  // Kurum profil metodları
  getInstitutionProfile: async (userId) => {
    const response = await api.get(`/Profiles/Institution/${userId}`);
    return response.data;
  },

  updateInstitutionProfile: async (userId, profileData) => {
    const response = await api.put(
      `/Profiles/Institution/${userId}`,
      profileData
    );
    return response.data;
  },

  // Dosya yükleme işlemleri
  uploadProfileImage: async (userId, file, userType) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
      `/Profiles/${userType}/${userId}/Image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // İlişkili veriler
  getInstitutionPsychologists: async (institutionId) => {
    const response = await api.get(
      `/Profiles/Institution/${institutionId}/Psychologists`
    );
    return response.data;
  },

  getPsychologistInstitution: async (psychologistId) => {
    const response = await api.get(
      `/Profiles/Psychologist/${psychologistId}/Institution`
    );
    return response.data;
  },
};

export default profileAPI;
