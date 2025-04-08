import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckFeatureAccess,
  GetFeatureLimit,
} from "../features/subscription/subscriptionSlice";

export const useSubscriptionFeature = (featureName) => {
  const dispatch = useDispatch();
  const { currentSubscription } = useSelector((state) => state.subscription);

  const checkAccess = async () => {
    if (featureName && currentSubscription) {
      await dispatch(CheckFeatureAccess(featureName));
    }
  };

  useEffect(() => {
    checkAccess();
  }, [featureName, currentSubscription]);

  const getPlanBasedAccess = () => {
    if (!currentSubscription) return false;

    const planId = currentSubscription.subscription.planId;

    switch (featureName) {
      case "psychologist_support":
        return planId === "premium" || planId === "pro";

      case "unlimited_chats":
        return planId === "premium" || planId === "pro";

      case "advanced_reports":
        return (
          planId === "standard" || planId === "premium" || planId === "pro"
        );

      case "all_meditation_content":
        return planId === "premium" || planId === "pro";

      default:
        return false;
    }
  };

  const getPlanLimit = () => {
    if (!currentSubscription) return 0;

    const planId = currentSubscription.subscription.planId;

    switch (featureName) {
      case "mood_entry":
        if (planId === "free") return 1;
        return -1;

      case "ai_chat_session":
        if (planId === "free") return 1;
        if (planId === "standard") return 3;
        return -1;

      case "chat_message":
        if (planId === "free") return 10;
        if (planId === "standard") return 30;
        return -1;

      case "psychologist_session":
        if (planId === "premium") return 2;
        if (planId === "pro") return 5;
        return 0;

      default:
        return 0;
    }
  };

  return {
    hasAccess: getPlanBasedAccess(),
    limit: getPlanLimit(),
    isUnlimited: getPlanLimit() === -1,
    isLoading: false,
    currentPlan: currentSubscription?.subscription?.planId || "free",
  };
};

export default useSubscriptionFeature;
