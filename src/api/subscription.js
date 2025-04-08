import api from "./axios";

export const subscriptionAPI = {
  getSubscriptionPlans: async (countryCode = "US", languageCode = "en") => {
    const response = await api.get(
      `/Subscriptions/GetSubscriptionPlans?countryCode=${countryCode}&languageCode=${languageCode}`
    );
    return response.data;
  },

  getSubscriptionPlan: async (id, countryCode = "US", languageCode = "en") => {
    const response = await api.get(
      `/Subscriptions/GetSubscriptionPlan/${id}?countryCode=${countryCode}&languageCode=${languageCode}`
    );
    return response.data;
  },

  getCurrentUserSubscription: async () => {
    const response = await api.get(`/Subscriptions/GetCurrentUserSubscription`);
    return response.data;
  },

  subscribeToPlan: async (subscriptionData) => {
    const response = await api.post(
      `/Subscriptions/SubscribeToPlan`,
      subscriptionData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await api.post(`/Subscriptions/CancelSubscription`);
    return response.data;
  },

  toggleAutoRenew: async (autoRenew) => {
    const response = await api.post(`/Subscriptions/ToggleAutoRenew`, {
      autoRenew,
    });
    return response.data;
  },

  getBillingHistory: async () => {
    const response = await api.get(`/Subscriptions/GetBillingHistory`);
    return response.data;
  },

  createPaymentForm: async (paymentFormData) => {
    const response = await api.post(
      `/Subscriptions/CreatePaymentForm`,
      paymentFormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  checkFeatureAccess: async (featureName) => {
    const response = await api.get(
      `/Subscriptions/CheckFeatureAccess?featureName=${featureName}`
    );
    return response.data;
  },

  getFeatureLimit: async (featureName) => {
    const response = await api.get(
      `/Subscriptions/GetFeatureLimit?featureName=${featureName}`
    );
    return response.data;
  },

  // Admin functions
  getAllUserSubscriptions: async () => {
    const response = await api.get(`/Subscriptions/GetAllUserSubscriptions`);
    return response.data;
  },

  addSubscriptionPlan: async (planData) => {
    const response = await api.post(
      `/Subscriptions/AddSubscriptionPlan`,
      planData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  updateSubscriptionPlan: async (id, planData) => {
    const response = await api.put(
      `/Subscriptions/UpdateSubscriptionPlan/${id}`,
      planData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  addSubscriptionTranslation: async (translationData) => {
    const response = await api.post(
      `/Subscriptions/AddSubscriptionTranslation`,
      translationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  addSubscriptionPrice: async (priceData) => {
    const response = await api.post(
      `/Subscriptions/AddSubscriptionPrice`,
      priceData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },
};
