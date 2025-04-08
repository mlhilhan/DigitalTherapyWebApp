// src/pages/patient/SubscriptionPlans.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  useTheme,
  Alert,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  Info,
  Star,
  Psychology,
  BusinessCenter,
  Subscriptions,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  GetSubscriptionPlans,
  GetCurrentUserSubscription,
  CreatePaymentForm,
  clearSubscriptionError,
  resetSubscriptionSuccess,
} from "../../features/subscription/subscriptionSlice";

import SubscriptionPlanCard from "../../components/subscription/SubscriptionPlanCard";
import SubscriptionComparisonTable from "../../components/subscription/SubscriptionComparisonTable";
import PaymentDialog from "../../components/subscription/PaymentDialog";
import SubscriptionFAQ from "../../components/subscription/SubscriptionFAQ";

const SubscriptionPlans = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Redux state
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const {
    availablePlans,
    currentSubscription,
    paymentForm,
    loading,
    error,
    success,
  } = useSelector((state) => state.subscription);

  // Kullanıcı dil ve ülke tercihlerini al
  const countryCode = profile?.country || "US";
  const languageCode = profile?.preferredLanguage || "en";

  // Component yüklendiğinde verileri getir
  useEffect(() => {
    dispatch(GetSubscriptionPlans({ countryCode, languageCode }));
    dispatch(GetCurrentUserSubscription());

    // Component unmount olduğunda state'i temizle
    return () => {
      dispatch(clearSubscriptionError());
      dispatch(resetSubscriptionSuccess());
    };
  }, [dispatch, countryCode, languageCode]);

  // Bir plan seçildiğinde
  const handlePlanSelect = (planId) => {
    const plan = availablePlans.find(
      (p) => p.id.toString() === planId.toString()
    );
    setSelectedPlan(plan);
    setOpenPaymentDialog(true);
  };

  // Dialog kapanınca
  const handlePaymentDialogClose = () => {
    setOpenPaymentDialog(false);
    setSelectedPlan(null);
  };

  // Ödeme işlemi başlatılınca
  const handlePaymentSubmit = () => {
    if (!selectedPlan) return;

    const returnUrl = `${window.location.origin}/payment-callback`;

    dispatch(
      CreatePaymentForm({
        subscriptionId: selectedPlan.id,
        amount: selectedPlan.price,
        currency: selectedPlan.currencyCode || "TRY",
        returnUrl,
      })
    );
  };

  // Ödeme formunu yükledikten sonra
  useEffect(() => {
    if (paymentForm && success) {
      // iyzico formunu yükle
      if (paymentForm.formContent) {
        // Form içeriğini DOM'a ekle ve göster
        const container = document.createElement("div");
        container.innerHTML = paymentForm.formContent;
        document.body.appendChild(container);

        // Dialog'u kapat
        setOpenPaymentDialog(false);

        // Bildirim göster
        setNotification({
          open: true,
          message: t("redirectingToPaymentPage"),
          severity: "info",
        });
      }
    }
  }, [paymentForm, success, t]);

  // Hata durumunda kullanıcıya bildir
  useEffect(() => {
    if (error) {
      setNotification({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [error]);

  const handleContactUs = () => {
    navigate("/contact-us");
  };

  // Mevcut abonelik planını belirle
  const getCurrentPlanId = () => {
    if (currentSubscription?.subscription?.planId) {
      return currentSubscription.subscription.planId;
    }
    return "free"; // Varsayılan olarak free
  };

  // Seçilen plan için fiyat ve isim bilgilerini al
  const getSelectedPlanInfo = () => {
    if (!selectedPlan) return { name: "", price: "" };

    return {
      name: selectedPlan.name,
      price: selectedPlan.price,
    };
  };

  const selectedPlanInfo = getSelectedPlanInfo();
  const currentPlanId = getCurrentPlanId();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Sayfa Başlığı */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {t("subscriptionPlans")}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t("chooseThePlanThatFitsYourNeeds")}
        </Typography>
      </Box>

      {/* Mevcut Abonelik Durumu */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.2),
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Subscriptions
                sx={{ fontSize: 36, color: "primary.main", mr: 2 }}
              />
              <Box>
                <Typography variant="h6">
                  {t("currentPlan")}:{" "}
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    {t(currentPlanId + "Plan")}
                  </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("youCanUpgradeDowngradeAnytime")}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: { xs: "left", sm: "right" } }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/patient-dashboard/billing-history")}
              sx={{ mr: 1 }}
            >
              {t("billingHistory")}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Planları Karşılaştır */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {t("comparePlans")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("selectThePlanThatBestFitsYourNeeds")}
        </Typography>
      </Box>

      {/* Plan Kartları */}
      {availablePlans && availablePlans.length > 0 ? (
        availablePlans.map((plan) => (
          <Grid item xs={12} sm={6} md={3} key={plan.id}>
            <SubscriptionPlanCard
              plan={plan}
              currentPlan={currentPlanId}
              onSelect={handlePlanSelect}
              onContactUs={handleContactUs}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Alert severity="info">{t("loadingSubscriptionPlans")}</Alert>
        </Grid>
      )}

      {/* Detaylı Özellik Karşılaştırma Bölümü */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          {t("detailedFeatureComparison")}
        </Typography>
        <SubscriptionComparisonTable plans={availablePlans} />
      </Box>

      {/* SSS Bölümü */}
      <SubscriptionFAQ />

      {/* Ödeme Dialog'u */}
      <PaymentDialog
        open={openPaymentDialog}
        onClose={handlePaymentDialogClose}
        selectedPlan={selectedPlan?.id}
        planName={selectedPlanInfo.name}
        planPrice={selectedPlanInfo.price}
        profile={profile}
        onConfirmPayment={handlePaymentSubmit}
        isLoading={loading}
      />

      {/* Bildirim */}
      {notification.open && (
        <Alert
          severity={notification.severity}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 2000,
            boxShadow: 4,
          }}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      )}
    </Container>
  );
};

export default SubscriptionPlans;
