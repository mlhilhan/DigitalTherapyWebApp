import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSubscriptionFeature } from "../../hooks/useSubscriptionFeature";

/**
 * FeatureGuard bileşeni, belirli bir özelliğe erişimin abonelik planına göre kısıtlanmasını sağlar.
 *
 * @param {string} featureName - Erişimi kontrol edilecek özelliğin adı
 * @param {React.ReactNode} children - Özelliğe erişim varsa gösterilecek içerik
 * @param {React.ReactNode} fallback - Özelliğe erişim yoksa gösterilecek alternatif içerik (opsiyonel)
 * @param {React.ReactNode} loadingComponent - Yükleme sırasında gösterilecek bileşen (opsiyonel)
 */
const FeatureGuard = ({
  featureName,
  children,
  fallback,
  loadingComponent,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasAccess, isLoading, currentPlan } =
    useSubscriptionFeature(featureName);

  // Yükleme durumunda yükleme bileşenini göster
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

  // Erişim yoksa fallback içeriğini veya varsayılan kısıtlama mesajını göster
  if (!hasAccess) {
    if (fallback) return fallback;

    return (
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          maxWidth: 500,
          mx: "auto",
          my: 4,
        }}
      >
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

  // Erişim varsa istenilen içeriği göster
  return children;
};

export default FeatureGuard;
