import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientProfileAPI } from "../../api/profile";
import i18n from "../../i18n/i18n";

export const GetCurrentPatientProfile = createAsyncThunk(
  "profile/GetCurrentPatientProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.getCurrentProfile();

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

export const GetPatientProfile = createAsyncThunk(
  "profile/GetPatientProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.getProfileById(userId);

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

// export const UpdatePatientProfile = createAsyncThunk(
//   "profile/UpdatePatientProfile",
//   async ({ id, profileData }, { rejectWithValue }) => {
//     try {
//       const response = await patientProfileAPI.updateProfile(id, profileData);

//       if (!response.success) {
//         return rejectWithValue(response.message || "Profil güncellenemedi");
//       }

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Profil güncellenemedi"
//       );
//     }
//   }
// );

export const UpdatePatientProfile = createAsyncThunk(
  "profile/UpdatePatientProfile",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user.userId;

      const response = await patientProfileAPI.updateProfile(userId, formData);

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

export const UploadProfileImage = createAsyncThunk(
  "profile/UploadProfileImage",
  async ({ id, imageFile }, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.uploadProfileImage(
        id,
        imageFile
      );

      if (!response.success) {
        return rejectWithValue(response.message || "Profil resmi yüklenemedi");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profil resmi yüklenemedi"
      );
    }
  }
);

export const GetPatientsByPsychologist = createAsyncThunk(
  "profile/GetPatientsByPsychologist",
  async (psychologistId, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.getPatientsByPsychologist(
        psychologistId
      );

      if (!response.success) {
        return rejectWithValue(response.message || "Hasta listesi alınamadı");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Hasta listesi alınamadı"
      );
    }
  }
);

export const GetPatientsByInstitution = createAsyncThunk(
  "profile/GetPatientsByInstitution",
  async (institutionId, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.getPatientsByInstitution(
        institutionId
      );

      if (!response.success) {
        return rejectWithValue(response.message || "Hasta listesi alınamadı");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Hasta listesi alınamadı"
      );
    }
  }
);

const initialState = {
  profile: null,
  patients: [],
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
      // GetCurrentPatientProfile
      .addCase(GetCurrentPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCurrentPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(GetCurrentPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetPatientProfile
      .addCase(GetPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(GetPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdatePatientProfile
      .addCase(UpdatePatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UpdatePatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(UpdatePatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // UploadProfileImage
      .addCase(UploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Güncel profil bilgisini al
        state.success = true;
      })
      .addCase(UploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // GetPatientsByPsychologist
      .addCase(GetPatientsByPsychologist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPatientsByPsychologist.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(GetPatientsByPsychologist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetPatientsByInstitution
      .addCase(GetPatientsByInstitution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPatientsByInstitution.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(GetPatientsByInstitution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileError, resetProfileSuccess } = profileSlice.actions;
export default profileSlice.reducer;
