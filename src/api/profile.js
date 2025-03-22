import api from "./axios";

export const patientProfileAPI = {
  getCurrentProfile: async () => {
    const response = await api.get("/PatientProfiles/GetCurrentPatientProfile");
    return response.data;
  },

  getProfileById: async (id) => {
    const response = await api.get(`/PatientProfiles/GetPatientProfile/${id}`);
    return response.data;
  },

  updateProfile: async (id, profileData) => {
    const response = await api.put(
      `/PatientProfiles/UpdatePatientProfile/${id}`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  uploadProfileImage: async (id, imageFile) => {
    const formData = new FormData();
    formData.append("Image", imageFile);

    const response = await api.post(
      `/PatientProfiles/UploadProfileImage/${id}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  getPatientsByPsychologist: async (psychologistId) => {
    const response = await api.get(
      `/PatientProfiles/GetPatientsByPsychologist/${psychologistId}`
    );
    return response.data;
  },

  getPatientsByInstitution: async (institutionId) => {
    const response = await api.get(
      `/PatientProfiles/GetPatientsByInstitution/${institutionId}`
    );
    return response.data;
  },
};
