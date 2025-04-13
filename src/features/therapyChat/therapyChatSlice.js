import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { therapyChatAPI } from "../../api/therapyChat";
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

export const StartChatSession = createAsyncThunk(
  "therapyChat/StartChatSession",
  async (forceNew = false, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.startSession(forceNew);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Terapi oturumu başlatılamadı",
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

export const SendChatMessage = createAsyncThunk(
  "therapyChat/SendChatMessage",
  async ({ message, sessionId }, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.sendMessage(message, sessionId);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Mesaj gönderilemedi",
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

export const GetChatSessions = createAsyncThunk(
  "therapyChat/GetChatSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.getSessions();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Terapi oturumları alınamadı",
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

export const GetChatMessages = createAsyncThunk(
  "therapyChat/GetChatMessages",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.getMessages(sessionId);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Oturum mesajları alınamadı",
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

export const EndChatSession = createAsyncThunk(
  "therapyChat/EndChatSession",
  async (sessionId, { rejectWithValue, dispatch }) => {
    try {
      const response = await therapyChatAPI.endSession(sessionId);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Oturum sonlandırılamadı",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetChatSessions());

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

export const ActivateSession = createAsyncThunk(
  "therapyChat/ActivateSession",
  async (sessionId, { rejectWithValue, dispatch }) => {
    try {
      const response = await therapyChatAPI.activateSession(sessionId);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Oturum aktifleştirilemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetChatSessions());

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

export const ClearAllSessions = createAsyncThunk(
  "therapyChat/ClearAllSessions",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await therapyChatAPI.clearAllSessions();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Oturumlar temizlenemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetChatSessions());

      return response;
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

export const CompleteSession = createAsyncThunk(
  "therapyChat/CompleteSession",
  async (sessionId, { rejectWithValue, dispatch }) => {
    try {
      const response = await therapyChatAPI.completeSession(sessionId);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Oturum tamamlanamadı",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetChatSessions());

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

export const ClearAiSession = createAsyncThunk(
  "therapyChat/ClearAiSession",
  async (sessionId, { rejectWithValue, dispatch }) => {
    try {
      const response = await therapyChatAPI.clearAiSession(sessionId);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Oturum arşivlenemedi",
          }),
          errorCode: response.errorCode,
        });
      }

      await dispatch(GetChatSessions());

      return response;
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
  activeSession: null,
  currentMessages: [],
  sessions: [],
  loading: false,
  loadingMessages: false,
  sending: false,
  error: null,
  success: false,
  drawerOpen: false,
};

const therapyChatSlice = createSlice({
  name: "therapyChat",
  initialState,
  reducers: {
    clearChatError: (state) => {
      state.error = null;
    },
    resetChatSuccess: (state) => {
      state.success = false;
    },
    setActiveSession: (state, action) => {
      if (action.payload === null) {
        state.activeSession = null;

        if (state.sessions.length > 0) {
          state.sessions = state.sessions.map((session) => ({
            ...session,
            isActive: false,
          }));
        }
      } else {
        state.activeSession = {
          ...action.payload,
          isActive: true,
        };

        if (state.sessions.length > 0) {
          state.sessions = state.sessions.map((session) => ({
            ...session,
            isActive: session.id === action.payload.id,
          }));
        }
      }
    },
    clearMessages: (state) => {
      state.currentMessages = [];
    },
    addLocalMessage: (state, action) => {
      const existingMsg = state.currentMessages.find(
        (m) => m.id === action.payload.id
      );
      if (!existingMsg) {
        state.currentMessages.push(action.payload);
      }
    },
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // StartChatSession
      .addCase(StartChatSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(StartChatSession.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSession = action.payload;
        state.success = true;
      })
      .addCase(StartChatSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // SendChatMessage
      .addCase(SendChatMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(SendChatMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.success = true;
      })
      .addCase(SendChatMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetChatSessions
      .addCase(GetChatSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetChatSessions.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && Array.isArray(action.payload)) {
          const activeId =
            state.activeSession?.id ||
            action.payload.find((s) => s.isActive)?.id;

          state.sessions = action.payload
            .map((session) => ({
              ...session,
              isActive: session.id === activeId,
            }))
            .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        } else {
          state.sessions = [];
        }
      })
      .addCase(GetChatSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetChatMessages
      .addCase(GetChatMessages.pending, (state) => {
        state.loadingMessages = true;
        state.error = null;
      })
      .addCase(GetChatMessages.fulfilled, (state, action) => {
        state.loadingMessages = false;

        const formattedMessages = action.payload.map((msg) => ({
          ...msg,
          isAiGenerated:
            msg.isAiGenerated !== undefined
              ? msg.isAiGenerated
              : msg.sender === "assistant" || msg.role === "model",
        }));

        state.currentMessages = formattedMessages;
      })
      .addCase(GetChatMessages.rejected, (state, action) => {
        state.loadingMessages = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // EndChatSession
      .addCase(EndChatSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EndChatSession.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.activeSession = null;
      })
      .addCase(EndChatSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // ActivateSession
      .addCase(ActivateSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ActivateSession.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSession = action.payload;
        state.success = true;
      })
      .addCase(ActivateSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // ClearAllSessions
      .addCase(ClearAllSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ClearAllSessions.fulfilled, (state) => {
        state.loading = false;
        state.activeSession = null;
        state.currentMessages = [];
        state.success = true;
      })
      .addCase(ClearAllSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // CompleteSession
      .addCase(CompleteSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CompleteSession.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (
          state.activeSession &&
          state.activeSession.id === action.payload.id
        ) {
          state.activeSession = {
            ...state.activeSession,
            ...action.payload,
            status: "Completed",
          };
        }

        if (state.sessions.length > 0) {
          state.sessions = state.sessions.map((session) =>
            session.id === action.payload.id
              ? { ...session, status: "Completed" }
              : session
          );
        }
      })
      .addCase(CompleteSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // ClearAiSession
      .addCase(ClearAiSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ClearAiSession.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (
          state.activeSession &&
          state.activeSession.id === action.payload.sessionId
        ) {
          state.activeSession = null;
          state.currentMessages = [];
        }
      })
      .addCase(ClearAiSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      });
  },
});

export const {
  clearChatError,
  resetChatSuccess,
  setActiveSession,
  clearMessages,
  addLocalMessage,
  setDrawerOpen,
} = therapyChatSlice.actions;
export default therapyChatSlice.reducer;
