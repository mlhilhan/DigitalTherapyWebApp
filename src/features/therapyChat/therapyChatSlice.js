import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { therapyChatAPI } from "../../api/therapyChat";
import i18n from "../../i18n/i18n";

export const StartChatSession = createAsyncThunk(
  "therapyChat/StartChatSession",
  async (forceNew = false, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.startSession(forceNew);

      if (!response.success) {
        return rejectWithValue(
          response.message || "Terapi oturumu başlatılamadı"
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

export const SendChatMessage = createAsyncThunk(
  "therapyChat/SendChatMessage",
  async ({ message, sessionId }, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.sendMessage(message, sessionId);

      if (!response.success) {
        return rejectWithValue(response.message || "Mesaj gönderilemedi");
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

export const GetChatSessions = createAsyncThunk(
  "therapyChat/GetChatSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.getSessions();

      if (!response.success) {
        return rejectWithValue(
          response.message || "Terapi oturumları alınamadı"
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

export const GetChatMessages = createAsyncThunk(
  "therapyChat/GetChatMessages",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await therapyChatAPI.getMessages(sessionId);

      if (!response.success) {
        return rejectWithValue(
          response.message || "Oturum mesajları alınamadı"
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

export const EndChatSession = createAsyncThunk(
  "therapyChat/EndChatSession",
  async (sessionId, { rejectWithValue, dispatch }) => {
    try {
      const response = await therapyChatAPI.endSession(sessionId);

      if (!response.success) {
        return rejectWithValue(response.message || "Oturum sonlandırılamadı");
      }

      await dispatch(GetChatSessions());

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
  activeSession: null,
  currentMessages: [],
  sessions: [],
  loading: false,
  loadingMessages: false,
  sending: false,
  error: null,
  success: false,
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
      state.activeSession = action.payload;
      state.currentMessages = [];
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
        state.error = action.payload;
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
        state.error = action.payload;
      })

      // GetChatSessions
      .addCase(GetChatSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetChatSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload.sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime)
        );
      })
      .addCase(GetChatSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
      });
  },
});

export const {
  clearChatError,
  resetChatSuccess,
  setActiveSession,
  clearMessages,
  addLocalMessage,
} = therapyChatSlice.actions;
export default therapyChatSlice.reducer;
