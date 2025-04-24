import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckFeatureAccess,
  GetFeatureLimit,
} from "../features/subscription/subscriptionSlice";

export const useSubscriptionFeature = (featureName) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { currentSubscription, featureAccess, featureLimits } = useSelector(
    (state) => state.subscription
  );

  const checkAccess = async () => {
    try {
      setIsLoading(true);
      if (featureName && currentSubscription) {
        await dispatch(CheckFeatureAccess(featureName));
      }
    } catch (error) {
      console.error("Error checking feature access:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (featureName) {
      checkAccess();
    } else {
      setIsLoading(false);
    }
  }, [featureName, currentSubscription?.subscription?.planId]);

  const getPlanBasedAccess = () => {
    if (featureAccess && featureAccess[featureName] !== undefined) {
      return featureAccess[featureName];
    }

    if (!currentSubscription || !currentSubscription.subscription) return false;

    const planId = currentSubscription.subscription.planId || "free";

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

      case "advanced_mood_views":
        return (
          planId === "standard" || planId === "premium" || planId === "pro"
        );

      case "basic_mood_tracking":
      case "basic_ai_chat":
        return true;

      default:
        return false;
    }
  };

  const getPlanLimit = () => {
    if (featureLimits && featureLimits[featureName] !== undefined) {
      return featureLimits[featureName];
    }

    if (!currentSubscription || !currentSubscription.subscription) return 0;

    const planId = currentSubscription.subscription.planId || "free";

    switch (featureName) {
      case "mood_entry":
        if (planId === "free") return 1;
        if (planId === "standard") return 3;
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

  const limit = getPlanLimit();

  return {
    hasAccess: getPlanBasedAccess(),
    limit,
    isUnlimited: limit === -1,
    isLoading,
    currentPlan: currentSubscription?.subscription?.planId || "free",
    refresh: checkAccess,
  };
};

export default useSubscriptionFeature;
