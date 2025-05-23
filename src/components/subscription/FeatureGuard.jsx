import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSubscriptionFeature from "../../hooks/useSubscriptionFeature";

const FeatureGuard = ({
  featureName,
  children,
  fallback,
  loadingComponent,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasAccess, isLoading } = useSubscriptionFeature(featureName);

  if (isLoading) {
    if (loadingComponent) {
      return loadingComponent;
    }
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={24} sx={{ mr: 1 }} />
        <Typography>{t("loading")}...</Typography>
      </Box>
    );
  }

  if (!hasAccess) {
    if (fallback) return fallback;

    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          {t("premiumFeature")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t("upgradeYourPlanToAccessThisFeature")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/patient-dashboard/subscription-plans")}
        >
          {t("viewSubscriptionPlans")}
        </Button>
      </Box>
    );
  }

  return children;
};

export default FeatureGuard;
