import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dailyTipAPI } from "../../api/dailyTip";
import i18n from "../../i18n/i18n";

export const GetCategories = createAsyncThunk(
  "dailyTip/GetCategories",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getCategories(languageCode);

      if (!response.success) {
        return rejectWithValue(response.message || "Kategoriler alınamadı");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const GetAllTips = createAsyncThunk(
  "dailyTip/GetAllTips",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getAllTips(languageCode);

      if (!response.success) {
        return rejectWithValue(response.message || "İpuçları alınamadı");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const GetTipsByCategory = createAsyncThunk(
  "dailyTip/GetTipsByCategory",
  async ({ categoryKey, languageCode = "en" }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getTipsByCategory(
        categoryKey,
        languageCode
      );

      if (!response.success) {
        return rejectWithValue(
          response.message || "Kategoriye ait ipuçları alınamadı"
        );
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const GetTipById = createAsyncThunk(
  "dailyTip/GetTipById",
  async ({ id, languageCode = "en" }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getTipById(id, languageCode);

      if (!response.success) {
        return rejectWithValue(response.message || "İpucu alınamadı");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const GetTipOfTheDay = createAsyncThunk(
  "dailyTip/GetTipOfTheDay",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getTipOfTheDay(languageCode);

      if (!response.success) {
        return rejectWithValue(response.message || "Günün ipucu alınamadı");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const GetBookmarkedTips = createAsyncThunk(
  "dailyTip/GetBookmarkedTips",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getBookmarkedTips(languageCode);

      if (!response.success) {
        return rejectWithValue(
          response.message || "Yer imli ipuçları alınamadı"
        );
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const ToggleBookmark = createAsyncThunk(
  "dailyTip/ToggleBookmark",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await dailyTipAPI.toggleBookmark(id);

      if (!response.success) {
        return rejectWithValue(response.message || "Yer imi güncellenemedi");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const CreateTip = createAsyncThunk(
  "dailyTip/CreateTip",
  async (tipData, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.createTip(tipData);

      if (!response.success) {
        return rejectWithValue(response.message || "İpucu oluşturulamadı");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const CreateCategory = createAsyncThunk(
  "dailyTip/CreateCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.createCategory(categoryData);

      if (!response.success) {
        return rejectWithValue(response.message || "Kategori oluşturulamadı");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const UpdateTip = createAsyncThunk(
  "dailyTip/UpdateTip",
  async ({ id, tipData }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.updateTip(id, tipData);

      if (!response.success) {
        return rejectWithValue(response.message || "İpucu güncellenemedi");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const UpdateCategory = createAsyncThunk(
  "dailyTip/UpdateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.updateCategory(id, categoryData);

      if (!response.success) {
        return rejectWithValue(response.message || "Kategori güncellenemedi");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const DeleteTip = createAsyncThunk(
  "dailyTip/DeleteTip",
  async (id, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.deleteTip(id);

      if (!response.success) {
        return rejectWithValue(response.message || "İpucu silinemedi");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

export const DeleteCategory = createAsyncThunk(
  "dailyTip/DeleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.deleteCategory(id);

      if (!response.success) {
        return rejectWithValue(response.message || "Kategori silinemedi");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        i18n.t("anUnexpectedErrorOccurred");

      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  categories: [],
  tips: [],
  tipOfTheDay: null,
  currentTip: null,
  bookmarkedTips: [],
  loading: false,
  error: null,
  success: false,
};

const dailyTipSlice = createSlice({
  name: "dailyTip",
  initialState,
  reducers: {
    clearTipError: (state) => {
      state.error = null;
    },
    resetTipSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GetCategories
      .addCase(GetCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(GetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetAllTips
      .addCase(GetAllTips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllTips.fulfilled, (state, action) => {
        state.loading = false;
        state.tips = action.payload;
      })
      .addCase(GetAllTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetTipsByCategory
      .addCase(GetTipsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTipsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.tips = action.payload;
      })
      .addCase(GetTipsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetTipById
      .addCase(GetTipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTipById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTip = action.payload;
      })
      .addCase(GetTipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetTipOfTheDay
      .addCase(GetTipOfTheDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTipOfTheDay.fulfilled, (state, action) => {
        state.loading = false;
        state.tipOfTheDay = action.payload;
      })
      .addCase(GetTipOfTheDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetBookmarkedTips
      .addCase(GetBookmarkedTips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBookmarkedTips.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarkedTips = action.payload;
      })
      .addCase(GetBookmarkedTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ToggleBookmark
      .addCase(ToggleBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(ToggleBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (state.currentTip && state.currentTip.id === action.meta.arg) {
          state.currentTip.isBookmarked = action.payload.isBookmarked;
        }

        state.tips = state.tips.map((tip) =>
          tip.id === action.meta.arg
            ? { ...tip, isBookmarked: action.payload.isBookmarked }
            : tip
        );

        if (state.tipOfTheDay && state.tipOfTheDay.id === action.meta.arg) {
          state.tipOfTheDay.isBookmarked = action.payload.isBookmarked;
        }
      })
      .addCase(ToggleBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // CreateTip
      .addCase(CreateTip.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(CreateTip.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tips.push(action.payload);
      })
      .addCase(CreateTip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // CreateCategory
      .addCase(CreateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload);
      })
      .addCase(CreateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // UpdateTip
      .addCase(UpdateTip.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UpdateTip.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (state.currentTip && state.currentTip.id === action.payload.id) {
          state.currentTip = action.payload;
        }

        state.tips = state.tips.map((tip) =>
          tip.id === action.payload.id ? action.payload : tip
        );
      })
      .addCase(UpdateTip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // UpdateCategory
      .addCase(UpdateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(UpdateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.categories = state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
      })
      .addCase(UpdateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // DeleteTip
      .addCase(DeleteTip.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(DeleteTip.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.tips = state.tips.filter((tip) => tip.id !== action.meta.arg);

        if (state.currentTip && state.currentTip.id === action.meta.arg) {
          state.currentTip = null;
        }
      })
      .addCase(DeleteTip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // DeleteCategory
      .addCase(DeleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.categories = state.categories.filter(
          (category) => category.id !== action.meta.arg
        );
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearTipError, resetTipSuccess } = dailyTipSlice.actions;
export default dailyTipSlice.reducer;
