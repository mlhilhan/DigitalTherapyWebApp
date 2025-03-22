import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth";
import { userProfileAPI } from "../../api/userProfile";
import i18n from "../../i18n/i18n";

const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("User storage parse error:", e);
    return null;
  }
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ UsernameOrEmail, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(UsernameOrEmail, password);

      if (!response.success) {
        return rejectWithValue(response.message || i18n.t("loginFailed"));
      }

      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || i18n.t("loginFailed")
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.register(userData);

      if (!response.success) {
        return rejectWithValue(response.message || i18n.t("registerFailed"));
      }

      if (response.success) {
        await dispatch(
          loginUser({
            UsernameOrEmail: userData.username,
            password: userData.password,
          })
        );
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || i18n.t("registerFailed")
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return true;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return rejectWithValue(
        error.response?.data?.message || i18n.t("logoutFailed")
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/ForgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await authAPI.forgotPassword(email);

      if (!response.success) {
        return rejectWithValue(
          response.message || i18n.t("passwordResetFailed")
        );
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || i18n.t("passwordResetFailed")
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        return { isAuthenticated: false };
      }

      if (accessToken) {
        dispatch(loadUserData());
      }

      return {
        isAuthenticated: true,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadUserData = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.isAuthenticated) {
        return rejectWithValue(i18n.t("userNotAuthenticated"));
      }

      const response = await userProfileAPI.getProfile();

      if (!response.success) {
        return rejectWithValue(
          response.message || i18n.t("failedToLoadUserData")
        );
      }

      return response.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || i18n.t("failedToLoadUserData")
      );
    }
  }
);

export const UpdateUserContact = createAsyncThunk(
  "auth/UpdateUserContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateUserContact(contactData);

      if (!response.success) {
        return rejectWithValue(
          response.message || i18n.t("contactInformationCouldNotUpdated")
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          i18n.t("contactInformationCouldNotUpdated")
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromStorage(),
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      })

      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        if (action.payload.isAuthenticated) {
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      })

      // Load User Data
      .addCase(loadUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
