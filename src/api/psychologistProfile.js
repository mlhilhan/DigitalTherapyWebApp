import api from "./axios";

export const psychologistProfileAPI = {
  getCurrentProfile: async () => {
    const response = await api.get(
      "/PsychologistProfiles/GetCurrentPsychologistProfile"
    );
    return response.data;
  },

  getProfileById: async (id) => {
    const response = await api.get(
      `/PsychologistProfiles/GetPsychologistProfile/${id}`
    );
    return response.data;
  },

  updateProfile: async (id, profileData) => {
    const response = await api.put(
      `/PsychologistProfiles/UpdatePsychologistProfile/${id}`,
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
      `/PsychologistProfiles/UploadProfileImage/${id}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  updateSpecialties: async (id, specialties) => {
    const response = await api.put(
      `/PsychologistProfiles/UpdatePsychologistSpecialties/${id}`,
      { specialties },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  updateAvailability: async (id, availabilityData) => {
    const response = await api.put(
      `/PsychologistProfiles/UpdatePsychologistAvailability/${id}`,
      availabilityData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  getAvailablePsychologists: async () => {
    const response = await api.get(
      "/PsychologistProfiles/GetAvailablePsychologists"
    );
    return response.data;
  },

  getPsychologistsBySpecialty: async (specialty) => {
    const response = await api.get(
      `/PsychologistProfiles/GetPsychologistsBySpecialty/${specialty}`
    );
    return response.data;
  },

  getPsychologistsByInstitution: async (institutionId) => {
    const response = await api.get(
      `/PsychologistProfiles/GetPsychologistsByInstitution/${institutionId}`
    );
    return response.data;
  },
};
