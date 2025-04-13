import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dailyTipAPI } from "../../api/dailyTip";
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

export const GetCategories = createAsyncThunk(
  "dailyTip/GetCategories",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getCategories(languageCode);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Kategoriler alınamadı",
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

export const GetAllTips = createAsyncThunk(
  "dailyTip/GetAllTips",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getAllTips(languageCode);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "İpuçları alınamadı",
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

export const GetTipsByCategory = createAsyncThunk(
  "dailyTip/GetTipsByCategory",
  async ({ categoryKey, languageCode = "en" }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getTipsByCategory(
        categoryKey,
        languageCode
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Kategoriye ait ipuçları alınamadı",
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

export const GetTipById = createAsyncThunk(
  "dailyTip/GetTipById",
  async ({ id, languageCode = "en" }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getTipById(id, languageCode);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "İpucu alınamadı",
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

export const GetTipOfTheDay = createAsyncThunk(
  "dailyTip/GetTipOfTheDay",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getTipOfTheDay(languageCode);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Günün ipucu alınamadı",
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

export const GetBookmarkedTips = createAsyncThunk(
  "dailyTip/GetBookmarkedTips",
  async (languageCode = "en", { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.getBookmarkedTips(languageCode);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Yer imli ipuçları alınamadı",
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

export const ToggleBookmark = createAsyncThunk(
  "dailyTip/ToggleBookmark",
  async (id, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.toggleBookmark(id);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Bookmark operation failed",
          }),
          errorCode: response.errorCode,
        });
      }

      return {
        id,
        isBookmarked: response.isBookmarked,
        message: response.message,
      };
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

export const CreateTip = createAsyncThunk(
  "dailyTip/CreateTip",
  async (tipData, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.createTip(tipData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "İpucu oluşturulamadı",
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

export const CreateCategory = createAsyncThunk(
  "dailyTip/CreateCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.createCategory(categoryData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Kategori oluşturulamadı",
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

export const UpdateTip = createAsyncThunk(
  "dailyTip/UpdateTip",
  async ({ id, tipData }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.updateTip(id, tipData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "İpucu güncellenemedi",
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

export const UpdateCategory = createAsyncThunk(
  "dailyTip/UpdateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.updateCategory(id, categoryData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Kategori güncellenemedi",
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

export const DeleteTip = createAsyncThunk(
  "dailyTip/DeleteTip",
  async (id, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.deleteTip(id);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "İpucu silinemedi",
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

export const DeleteCategory = createAsyncThunk(
  "dailyTip/DeleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await dailyTipAPI.deleteCategory(id);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Kategori silinemedi",
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
        state.error = action.payload?.translatedError || action.payload;
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
        state.error = action.payload?.translatedError || action.payload;
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
        state.error = action.payload?.translatedError || action.payload;
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

        const { id, isBookmarked } = action.payload;

        if (state.currentTip && state.currentTip.id === id) {
          state.currentTip.isBookmarked = isBookmarked;
        }

        state.tips = state.tips.map((tip) =>
          tip.id === id ? { ...tip, isBookmarked } : tip
        );

        if (state.tipOfTheDay && state.tipOfTheDay.id === id) {
          state.tipOfTheDay.isBookmarked = isBookmarked;
        }

        if (isBookmarked) {
          const existingTip = state.bookmarkedTips.find((tip) => tip.id === id);
          if (!existingTip) {
            const tipToAdd = state.tips.find((tip) => tip.id === id);
            if (tipToAdd) {
              state.bookmarkedTips.push(tipToAdd);
            }
          }
        } else {
          state.bookmarkedTips = state.bookmarkedTips.filter(
            (tip) => tip.id !== id
          );
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
