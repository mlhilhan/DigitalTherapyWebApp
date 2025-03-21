import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileAPI } from "../../api/profile";

// Hasta profili getirme
export const fetchPatientProfile = createAsyncThunk(
  "profile/fetchPatientProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getPatientProfile(userId);

      if (!response.success) {
        return rejectWithValue(
          response.message || "Profil bilgileri alınamadı"
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profil bilgileri alınamadı"
      );
    }
  }
);

// Psikolog profili getirme
export const fetchPsychologistProfile = createAsyncThunk(
  "profile/fetchPsychologistProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getPsychologistProfile(userId);

      if (!response.success) {
        return rejectWithValue(
          response.message || "Profil bilgileri alınamadı"
        );
      }

      // Eğer psikolog bir kuruma bağlıysa, kurum bilgilerini de al
      let institutionData = null;
      if (response.data.institutionId) {
        const institutionResponse = await profileAPI.getPsychologistInstitution(
          userId
        );
        if (institutionResponse.success) {
          institutionData = institutionResponse.data;
        }
      }

      return {
        profile: response.data,
        institution: institutionData,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profil bilgileri alınamadı"
      );
    }
  }
);

// Kurum profili getirme
export const fetchInstitutionProfile = createAsyncThunk(
  "profile/fetchInstitutionProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getInstitutionProfile(userId);

      if (!response.success) {
        return rejectWithValue(
          response.message || "Profil bilgileri alınamadı"
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profil bilgileri alınamadı"
      );
    }
  }
);

// Hasta profili güncelleme
export const updatePatientProfile = createAsyncThunk(
  "profile/updatePatientProfile",
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user.userId;

      // Eğer avatar dosyası varsa, önce onu yükle
      if (profileData.get("avatar")) {
        await profileAPI.uploadProfileImage(
          userId,
          profileData.get("avatar"),
          "Patient"
        );
        profileData.delete("avatar"); // FormData'dan dosyayı kaldır
      }

      const response = await profileAPI.updatePatientProfile(
        userId,
        profileData
      );

      if (!response.success) {
        return rejectWithValue(response.message || "Profil güncellenemedi");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profil güncellenemedi"
      );
    }
  }
);

// Psikolog profili güncelleme
export const updatePsychologistProfile = createAsyncThunk(
  "profile/updatePsychologistProfile",
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user.userId;

      // Eğer avatar dosyası varsa, önce onu yükle
      if (profileData.get("avatar")) {
        await profileAPI.uploadProfileImage(
          userId,
          profileData.get("avatar"),
          "Psychologist"
        );
        profileData.delete("avatar"); // FormData'dan dosyayı kaldır
      }

      const response = await profileAPI.updatePsychologistProfile(
        userId,
        profileData
      );

      if (!response.success) {
        return rejectWithValue(response.message || "Profil güncellenemedi");
      }

      // Eğer psikolog bir kuruma bağlıysa, kurum bilgilerini de al
      let institutionData = null;
      if (response.data.institutionId) {
        const institutionResponse = await profileAPI.getPsychologistInstitution(
          userId
        );
        if (institutionResponse.success) {
          institutionData = institutionResponse.data;
        }
      }

      return {
        profile: response.data,
        institution: institutionData,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profil güncellenemedi"
      );
    }
  }
);

// Kurum profili güncelleme
export const updateInstitutionProfile = createAsyncThunk(
  "profile/updateInstitutionProfile",
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user.userId;

      // Eğer avatar dosyası varsa, önce onu yükle
      if (profileData.get("avatar")) {
        await profileAPI.uploadProfileImage(
          userId,
          profileData.get("avatar"),
          "Institution"
        );
        profileData.delete("avatar");
      }

      const response = await profileAPI.updateInstitutionProfile(
        userId,
        profileData
      );

      if (!response.success) {
        return rejectWithValue(response.message || "Profil güncellenemedi");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profil güncellenemedi"
      );
    }
  }
);

const initialState = {
  profile: null,
  institution: null, // Psikolog için bağlı olduğu kurum bilgisi
  loading: false,
  error: null,
  success: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    resetProfileSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Hasta profili getirme
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.institution = null;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Psikolog profili getirme
      .addCase(fetchPsychologistProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPsychologistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.institution = action.payload.institution;
      })
      .addCase(fetchPsychologistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Kurum profili getirme
      .addCase(fetchInstitutionProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutionProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.institution = null;
      })
      .addCase(fetchInstitutionProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Hasta profili güncelleme
      .addCase(updatePatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Psikolog profili güncelleme
      .addCase(updatePsychologistProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePsychologistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.institution = action.payload.institution;
        state.success = true;
      })
      .addCase(updatePsychologistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Kurum profili güncelleme
      .addCase(updateInstitutionProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateInstitutionProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateInstitutionProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearProfileError, resetProfileSuccess } = profileSlice.actions;
export default profileSlice.reducer;
