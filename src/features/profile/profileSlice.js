import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientProfileAPI } from "../../api/profile";
import config from "../../config";
import i18n from "../../i18n/i18n";
import { getUserCountryFromBrowser } from "../../utils/countryUtils";

const getErrorTranslation = (error) => {
  if (error && error.errorCode) {
    switch (error.errorCode) {
      case "":
        return i18n.t("");
      case "":
        return i18n.t("");
      case "":
        return i18n.t("");
      default:
        return error.message || i18n.t("anUnexpectedErrorOccurred");
    }
  }
  return error?.message || i18n.t("anUnexpectedErrorOccurred");
};

export const GetCurrentPatientProfile = createAsyncThunk(
  "profile/GetCurrentPatientProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.getCurrentProfile();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Profil bilgileri alınamadı",
          }),
          errorCode: response.errorCode,
        });
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
    }
  }
);

export const GetPatientProfile = createAsyncThunk(
  "profile/GetPatientProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.getProfileById(userId);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Profil bilgileri alınamadı",
          }),
          errorCode: response.errorCode,
        });
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
    }
  }
);

export const UpdatePatientProfile = createAsyncThunk(
  "profile/UpdatePatientProfile",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user.userId;

      const response = await patientProfileAPI.updateProfile(userId, formData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Profil güncellenemedi",
          }),
          errorCode: response.errorCode,
          statusCode: 200,
        });
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
    }
  }
);

export const UploadProfileImageX = createAsyncThunk(
  "profile/UploadProfileImage",
  async ({ id, imageFile }, { rejectWithValue }) => {
    try {
      const response = await patientProfileAPI.uploadProfileImage(
        id,
        imageFile
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Profil resmi yüklenemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
    }
  }
);

export const UploadProfileImage = createAsyncThunk(
  "profile/UploadProfileImage",
  async ({ id, imageFile }, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("Image", imageFile);

      const response = await patientProfileAPI.uploadProfileImage(id, formData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Profil resmi yüklenemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      const baseUrl = config.apiBaseUrl;
      const avatarUrl = `${baseUrl}${response.data.avatarUrl}`;

      await dispatch(GetCurrentPatientProfile());

      return { ...response.data, avatarUrl };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
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
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Hasta listesi alınamadı",
          }),
          errorCode: response.errorCode,
        });
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
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
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Hasta listesi alınamadı",
          }),
          errorCode: response.errorCode,
        });
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
    }
  }
);

export const UpdateLanguagePreference = createAsyncThunk(
  "profile/UpdateLanguagePreference",
  async (language, { rejectWithValue, dispatch }) => {
    try {
      const response = await patientProfileAPI.updateProfileLanguage(language);
      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Dil tercihi güncellenemedi",
          }),
          errorCode: response.errorCode,
        });
      }
      i18n.changeLanguage(language);
      await dispatch(GetCurrentPatientProfile());
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
    }
  }
);

export const UpdateUserCountry = createAsyncThunk(
  "profile/UpdateUserCountry",
  async (countryCode, { rejectWithValue, dispatch }) => {
    try {
      const formData = { country: countryCode };

      const response = await patientProfileAPI.updateProfile(formData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Ülke bilgisi güncellenemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetCurrentPatientProfile());

      return countryCode;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      const errorCode = error.response?.data?.errorCode;

      return rejectWithValue({
        originalError: errorMessage,
        translatedError: getErrorTranslation({
          errorCode: errorCode,
          message: errorMessage,
        }),
        errorCode: errorCode,
      });
    }
  }
);

const initialState = {
  profile: null,
  patients: [],
  loading: false,
  error: null,
  success: false,
  languageLoaded: false,
  userCountry: getUserCountryFromBrowser(),
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
    setLanguageLoaded: (state, action) => {
      state.languageLoaded = action.payload;
    },
    updateUserCountry: (state, action) => {
      state.userCountry = action.payload;
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
        state.languageLoaded = true;

        if (action.payload && action.payload.country) {
          state.userCountry = action.payload.country;
        }
      })
      .addCase(GetCurrentPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.languageLoaded = true;
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
        state.error = action.payload?.translatedError || action.payload;
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

        if (action.payload && action.payload.country) {
          state.userCountry = action.payload.country;
        }
      })
      .addCase(UpdatePatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
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
        state.success = true;
        state.profile = {
          ...state.profile,
          avatarUrl: action.payload.avatarUrl,
        };
      })
      .addCase(UploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
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
        state.error = action.payload?.translatedError || action.payload;
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
        state.error = action.payload?.translatedError || action.payload;
      })

      // UpdateLanguagePreference
      .addCase(UpdateLanguagePreference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateLanguagePreference.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(UpdateLanguagePreference.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // UpdateUserCountry
      .addCase(UpdateUserCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.userCountry = action.payload;
        state.success = true;
      })
      .addCase(UpdateUserCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      });
  },
});

export const {
  clearProfileError,
  resetProfileSuccess,
  setLanguageLoaded,
  updateUserCountry,
} = profileSlice.actions;
export default profileSlice.reducer;
