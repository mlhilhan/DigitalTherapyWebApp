import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import psychologistProfileReducer from "../features/profile/psychologistProfileSlice";
import emotionalStateReducer from "../features/emotionalState/emotionalStateSlice";
import therapyChatReducer from "../features/therapyChat/therapyChatSlice";
import dailyTipReducer from "../features/dailyTip/dailyTipSlice";
import subscriptionReducer from "../features/subscription/subscriptionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    psychologist: psychologistProfileReducer,
    emotionalState: emotionalStateReducer,
    therapyChat: therapyChatReducer,
    dailyTip: dailyTipReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
