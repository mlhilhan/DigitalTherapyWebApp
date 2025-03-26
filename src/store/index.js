import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import psychologistProfileReducer from "../features/profile/psychologistProfileSlice";
import emotionalStateReducer from "../features/emotionalState/emotionalStateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    psychologist: psychologistProfileReducer,
    emotionalState: emotionalStateReducer,
  },
});

export default store;
