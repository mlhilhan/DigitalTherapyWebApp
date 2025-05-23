import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { emotionalStateAPI } from "../../api/emotionalState";
import i18n from "../../i18n/i18n";

const getErrorTranslation = (error) => {
  if (error && error.errorCode) {
    switch (error.errorCode) {
      case "DAILY_LIMIT_REACHED":
        return i18n.t("dailyMoodEntryLimitReached");
      case "FEATURE_ACCESS_DENIED":
        return i18n.t("featureAccessDenied");
      case "SUBSCRIPTION_FEATURE_RESTRICTED":
        return i18n.t("subscriptionFeatureRestricted");
      default:
        return error.message || i18n.t("anUnexpectedErrorOccurred");
    }
  }

  return error?.message || i18n.t("anUnexpectedErrorOccurred");
};

export const GetAllEmotionalStates = createAsyncThunk(
  "emotionalState/GetAllEmotionalStates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await emotionalStateAPI.getAllEntries();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
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

export const GetEmotionalStateById = createAsyncThunk(
  "emotionalState/GetEmotionalStateById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await emotionalStateAPI.getEntryById(id);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
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

export const GetEmotionalStatesByDateRange = createAsyncThunk(
  "emotionalState/GetEmotionalStatesByDateRange",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await emotionalStateAPI.getEntriesByDateRange(
        startDate,
        endDate
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
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

export const GetBookmarkedEmotionalStates = createAsyncThunk(
  "emotionalState/GetBookmarkedEmotionalStates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await emotionalStateAPI.getBookmarkedEntries();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
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

export const GetEmotionalStateStatistics = createAsyncThunk(
  "emotionalState/GetEmotionalStateStatistics",
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const response = await emotionalStateAPI.getStatistics(
        startDate,
        endDate
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
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

export const CreateEmotionalState = createAsyncThunk(
  "emotionalState/CreateEmotionalState",
  async (entryData, { rejectWithValue, dispatch }) => {
    try {
      const response = await emotionalStateAPI.createEntry(entryData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
          }),
          errorCode: response.errorCode,
        });
      }

      dispatch(GetAllEmotionalStates());

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

export const UpdateEmotionalState = createAsyncThunk(
  "emotionalState/UpdateEmotionalState",
  async ({ id, entryData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await emotionalStateAPI.updateEntry(id, entryData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
          }),
          errorCode: response.errorCode,
        });
      }

      dispatch(GetAllEmotionalStates());

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

export const DeleteEmotionalState = createAsyncThunk(
  "emotionalState/DeleteEmotionalState",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await emotionalStateAPI.deleteEntry(id);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
          }),
          errorCode: response.errorCode,
        });
      }

      dispatch(GetAllEmotionalStates());

      return id;
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

export const ToggleBookmarkEmotionalState = createAsyncThunk(
  "emotionalState/ToggleBookmarkEmotionalState",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await emotionalStateAPI.toggleBookmark(id);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message,
          }),
          errorCode: response.errorCode,
        });
      }

      dispatch(GetAllEmotionalStates());

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
  entries: [],
  currentEntry: null,
  bookmarkedEntries: [],
  statistics: null,
  loading: false,
  error: null,
  success: false,
  filterMode: "all",
  filterDate: null,
  viewMode: "journal",
};

const emotionalStateSlice = createSlice({
  name: "emotionalState",
  initialState,
  reducers: {
    clearEmotionalStateError: (state) => {
      state.error = null;
    },
    resetEmotionalStateSuccess: (state) => {
      state.success = false;
    },
    setFilterMode: (state, action) => {
      state.filterMode = action.payload;
      if (action.payload !== "custom") {
        state.filterDate = null;
      }
    },
    setFilterDate: (state, action) => {
      state.filterDate = action.payload;
      state.filterMode = "custom";
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GetAllEmotionalStates
      .addCase(GetAllEmotionalStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllEmotionalStates.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(GetAllEmotionalStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetEmotionalStateById
      .addCase(GetEmotionalStateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetEmotionalStateById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEntry = action.payload;
      })
      .addCase(GetEmotionalStateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetEmotionalStatesByDateRange
      .addCase(GetEmotionalStatesByDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetEmotionalStatesByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(GetEmotionalStatesByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetBookmarkedEmotionalStates
      .addCase(GetBookmarkedEmotionalStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBookmarkedEmotionalStates.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarkedEntries = action.payload;
      })
      .addCase(GetBookmarkedEmotionalStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetEmotionalStateStatistics
      .addCase(GetEmotionalStateStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetEmotionalStateStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(GetEmotionalStateStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // CreateEmotionalState
      .addCase(CreateEmotionalState.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(CreateEmotionalState.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateEmotionalState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // UpdateEmotionalState
      .addCase(UpdateEmotionalState.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UpdateEmotionalState.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(UpdateEmotionalState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // DeleteEmotionalState
      .addCase(DeleteEmotionalState.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(DeleteEmotionalState.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Remove deleted entry from state if it exists
        state.entries = state.entries.filter(
          (entry) => entry.id !== action.payload
        );
        if (state.currentEntry && state.currentEntry.id === action.payload) {
          state.currentEntry = null;
        }
      })
      .addCase(DeleteEmotionalState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // ToggleBookmarkEmotionalState
      .addCase(ToggleBookmarkEmotionalState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ToggleBookmarkEmotionalState.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(ToggleBookmarkEmotionalState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      });
  },
});

export const {
  clearEmotionalStateError,
  resetEmotionalStateSuccess,
  setFilterMode,
  setFilterDate,
  setViewMode,
} = emotionalStateSlice.actions;

export default emotionalStateSlice.reducer;
