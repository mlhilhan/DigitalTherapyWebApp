import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscriptionAPI } from "../../api/subscription";
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

export const GetSubscriptionPlans = createAsyncThunk(
  "subscription/GetSubscriptionPlans",
  async (
    { countryCode = "US", languageCode = "en" } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await subscriptionAPI.getSubscriptionPlans(
        countryCode,
        languageCode
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message:
              response.message || "Failed to retrieve subscription plans",
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

export const GetSubscriptionPlan = createAsyncThunk(
  "subscription/GetSubscriptionPlan",
  async (
    { id, countryCode = "US", languageCode = "en" },
    { rejectWithValue }
  ) => {
    try {
      const response = await subscriptionAPI.getSubscriptionPlan(
        id,
        countryCode,
        languageCode
      );

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Failed to retrieve subscription plan",
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

export const GetSubscriptionPlansByRole = createAsyncThunk(
  "subscription/GetSubscriptionPlansByRole",
  async ({ roleId, countryCode, languageCode }, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.getSubscriptionPlansByRole(
        roleId,
        countryCode,
        languageCode
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
      const errorMessage = error.response?.data?.message || error.message;
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

export const GetCurrentUserSubscription = createAsyncThunk(
  "subscription/GetCurrentUserSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.getCurrentUserSubscription();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message:
              response.message || "Failed to retrieve current subscription",
          }),
          errorCode: response.errorCode,
        });
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          i18n.t("anUnexpectedErrorOccurred");

        const errorCode = error.response?.data?.errorCode;

        return {
          error: errorMessage,
          defaultFreePlan: true,
          subscription: {
            planId: "free",
            isActive: true,
            autoRenew: false,
            startDate: new Date().toISOString(),
            endDate: new Date(
              new Date().setFullYear(new Date().getFullYear() + 100)
            ).toISOString(),
          },
        };
      }

      const errorMessage = error.message || i18n.t("anUnexpectedErrorOccurred");
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

export const SubscribeToPlan = createAsyncThunk(
  "subscription/SubscribeToPlan",
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.subscribeToPlan(subscriptionData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Failed to subscribe to plan",
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

export const CancelSubscription = createAsyncThunk(
  "subscription/CancelSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.cancelSubscription();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Failed to cancel subscription",
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

export const ToggleAutoRenew = createAsyncThunk(
  "subscription/ToggleAutoRenew",
  async (autoRenew, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.toggleAutoRenew(autoRenew);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message:
              response.message || "Failed to update auto-renewal settings",
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

export const GetBillingHistory = createAsyncThunk(
  "subscription/GetBillingHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.getBillingHistory();

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Failed to retrieve billing history",
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

export const CreatePaymentForm = createAsyncThunk(
  "subscription/CreatePaymentForm",
  async (paymentFormData, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.createPaymentForm(paymentFormData);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Failed to create payment form",
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

export const CheckFeatureAccess = createAsyncThunk(
  "subscription/CheckFeatureAccess",
  async (featureName, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.checkFeatureAccess(featureName);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Failed to check feature access",
          }),
          errorCode: response.errorCode,
        });
      }

      return {
        featureName,
        hasAccess: response.hasAccess,
      };
    } catch (error) {
      if (error.response) {
        return {
          featureName,
          hasAccess: false,
          error: true,
        };
      }

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

export const GetFeatureLimit = createAsyncThunk(
  "subscription/GetFeatureLimit",
  async (featureName, { rejectWithValue }) => {
    try {
      const response = await subscriptionAPI.getFeatureLimit(featureName);

      if (!response.success) {
        return rejectWithValue({
          originalError: response.message,
          translatedError: getErrorTranslation({
            errorCode: response.errorCode,
            message: response.message || "Failed to retrieve feature limit",
          }),
          errorCode: response.errorCode,
        });
      }

      return {
        featureName,
        limit: response.limit,
      };
    } catch (error) {
      if (error.response) {
        return {
          featureName,
          limit: 0,
          error: true,
        };
      }

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
  availablePlans: [],
  currentPlan: null,
  currentSubscription: null,
  billingHistory: [],
  paymentForm: null,
  featureAccess: {},
  featureLimits: {},
  loading: false,
  error: null,
  success: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    resetSubscriptionSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GetSubscriptionPlans
      .addCase(GetSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.availablePlans = action.payload;
      })
      .addCase(GetSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.availablePlans = [];
      })

      // GetSubscriptionPlan
      .addCase(GetSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload;
      })
      .addCase(GetSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetSubscriptionPlansByRole
      .addCase(GetSubscriptionPlansByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubscriptionPlansByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.availablePlans = action.payload;
      })
      .addCase(GetSubscriptionPlansByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
      })

      // GetCurrentUserSubscription
      .addCase(GetCurrentUserSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCurrentUserSubscription.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.defaultFreePlan) {
          state.error = action.payload.error;
          state.currentSubscription = {
            subscription: action.payload.subscription,
          };
        } else {
          state.currentSubscription = action.payload;
        }
      })
      .addCase(GetCurrentUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.currentSubscription = {
          subscription: {
            planId: "free",
            isActive: true,
            autoRenew: false,
          },
        };
      })

      // SubscribeToPlan
      .addCase(SubscribeToPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(SubscribeToPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload;
        state.success = true;
      })
      .addCase(SubscribeToPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // CancelSubscription
      .addCase(CancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(CancelSubscription.fulfilled, (state) => {
        state.loading = false;
        state.currentSubscription = null;
        state.success = true;
      })
      .addCase(CancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // ToggleAutoRenew
      .addCase(ToggleAutoRenew.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(ToggleAutoRenew.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSubscription) {
          state.currentSubscription.autoRenew = action.meta.arg;
        }
        state.success = true;
      })
      .addCase(ToggleAutoRenew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // GetBillingHistory
      .addCase(GetBillingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBillingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.billingHistory = action.payload;
      })
      .addCase(GetBillingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.billingHistory = [];
      })

      // CreatePaymentForm
      .addCase(CreatePaymentForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(CreatePaymentForm.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentForm = action.payload;
        state.success = true;
      })
      .addCase(CreatePaymentForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        state.success = false;
      })

      // CheckFeatureAccess
      .addCase(CheckFeatureAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CheckFeatureAccess.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.featureAccess = {
            ...state.featureAccess,
            [action.payload.featureName]: false,
          };
        } else {
          state.featureAccess = {
            ...state.featureAccess,
            [action.payload.featureName]: action.payload.hasAccess,
          };
        }
      })
      .addCase(CheckFeatureAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        if (action.meta && action.meta.arg) {
          state.featureAccess = {
            ...state.featureAccess,
            [action.meta.arg]: false,
          };
        }
      })

      // GetFeatureLimit
      .addCase(GetFeatureLimit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFeatureLimit.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.featureLimits = {
            ...state.featureLimits,
            [action.payload.featureName]: 0,
          };
        } else {
          state.featureLimits = {
            ...state.featureLimits,
            [action.payload.featureName]: action.payload.limit,
          };
        }
      })
      .addCase(GetFeatureLimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.translatedError || action.payload;
        if (action.meta && action.meta.arg) {
          state.featureLimits = {
            ...state.featureLimits,
            [action.meta.arg]: 0,
          };
        }
      });
  },
});

export const { clearSubscriptionError, resetSubscriptionSuccess } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
