import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { psychologistProfileAPI } from "../../api/psychologistProfile";
import i18n from "../../i18n/i18n";

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

export const GetCurrentPsychologistProfile = createAsyncThunk(
  "psychologistProfile/GetCurrentPsychologistProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await psychologistProfileAPI.getCurrentProfile();

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

export const GetPsychologistProfile = createAsyncThunk(
  "psychologistProfile/GetPsychologistProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await psychologistProfileAPI.getProfileById(userId);

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

export const UpdatePsychologistProfile = createAsyncThunk(
  "psychologistProfile/UpdatePsychologistProfile",
  async ({ profileData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user.userId;

      const response = await psychologistProfileAPI.updateProfile(
        userId,
        profileData
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Profil güncellenemedi",
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

export const UploadPsychologistProfileImage = createAsyncThunk(
  "psychologistProfile/UploadPsychologistProfileImage",
  async ({ id, imageFile }, { rejectWithValue, dispatch }) => {
    try {
      const response = await psychologistProfileAPI.uploadProfileImage(
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

      await dispatch(GetCurrentPsychologistProfile());

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

export const UpdatePsychologistSpecialties = createAsyncThunk(
  "psychologistProfile/UpdatePsychologistSpecialties",
  async ({ id, specialties }, { rejectWithValue, dispatch }) => {
    try {
      const response = await psychologistProfileAPI.updateSpecialties(
        id,
        specialties
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Uzmanlık alanları güncellenemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetCurrentPsychologistProfile());

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

export const UpdatePsychologistAvailability = createAsyncThunk(
  "psychologistProfile/UpdatePsychologistAvailability",
  async (
    { id, isAvailable, availabilitySlots },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const availabilityData = {
        isAvailable,
        availabilitySlots,
      };

      const response = await psychologistProfileAPI.updateAvailability(
        id,
        availabilityData
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Uygunluk durumu güncellenemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetCurrentPsychologistProfile());

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

export const UpdatePsychologistLanguagePreference = createAsyncThunk(
  "psychologistProfile/UpdatePsychologistLanguagePreference",
  async ({ id, language }, { rejectWithValue, dispatch }) => {
    try {
      const profileData = {
        preferredLanguage: language,
      };

      const response = await psychologistProfileAPI.updateProfile(
        id,
        profileData
      );
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
      await dispatch(GetCurrentPsychologistProfile());

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

export const GetAvailablePsychologists = createAsyncThunk(
  "psychologistProfile/GetAvailablePsychologists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await psychologistProfileAPI.getAvailablePsychologists();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Uygun psikologlar alınamadı",
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

export const GetPsychologistsBySpecialty = createAsyncThunk(
  "psychologistProfile/GetPsychologistsBySpecialty",
  async (specialty, { rejectWithValue }) => {
    try {
      const response = await psychologistProfileAPI.getPsychologistsBySpecialty(
        specialty
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Psikologlar alınamadı",
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

export const GetPsychologistsByInstitution = createAsyncThunk(
  "psychologistProfile/GetPsychologistsByInstitution",
  async (institutionId, { rejectWithValue }) => {
    try {
      const response =
        await psychologistProfileAPI.getPsychologistsByInstitution(
          institutionId
        );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Kuruma ait psikologlar alınamadı",
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

const initialState = {
  profile: null,
  psychologists: [],
  loading: false,
  error: null,
  success: false,
  languageLoaded: false,
};

const psychologistProfileSlice = createSlice({
  name: "psychologistProfile",
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
  },
  extraReducers: (builder) => {
    builder
      // GetCurrentPsychologistProfile
      .addCase(GetCurrentPsychologistProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCurrentPsychologistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.languageLoaded = true;
      })
      .addCase(GetCurrentPsychologistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.languageLoaded = true;
      })

      // GetPsychologistProfile
      .addCase(GetPsychologistProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPsychologistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(GetPsychologistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // UpdatePsychologistProfile
      .addCase(UpdatePsychologistProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UpdatePsychologistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(UpdatePsychologistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // UploadPsychologistProfileImage
      .addCase(UploadPsychologistProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UploadPsychologistProfileImage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(UploadPsychologistProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // UpdatePsychologistSpecialties
      .addCase(UpdatePsychologistSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UpdatePsychologistSpecialties.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(UpdatePsychologistSpecialties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // UpdatePsychologistAvailability
      .addCase(UpdatePsychologistAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UpdatePsychologistAvailability.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(UpdatePsychologistAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // GetAvailablePsychologists
      .addCase(GetAvailablePsychologists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAvailablePsychologists.fulfilled, (state, action) => {
        state.loading = false;
        state.psychologists = action.payload;
      })
      .addCase(GetAvailablePsychologists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetPsychologistsBySpecialty
      .addCase(GetPsychologistsBySpecialty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPsychologistsBySpecialty.fulfilled, (state, action) => {
        state.loading = false;
        state.psychologists = action.payload;
      })
      .addCase(GetPsychologistsBySpecialty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetPsychologistsByInstitution
      .addCase(GetPsychologistsByInstitution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPsychologistsByInstitution.fulfilled, (state, action) => {
        state.loading = false;
        state.psychologists = action.payload;
      })
      .addCase(GetPsychologistsByInstitution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // UpdatePsychologistLanguagePreference
      .addCase(UpdatePsychologistLanguagePreference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatePsychologistLanguagePreference.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        UpdatePsychologistLanguagePreference.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.translatedError || action.payload;
        }
      );
  },
});

export const { clearProfileError, resetProfileSuccess, setLanguageLoaded } =
  psychologistProfileSlice.actions;
export default psychologistProfileSlice.reducer;
