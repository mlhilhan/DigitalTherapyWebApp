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
  CircularProgress,
  Skeleton,
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
  GetSubscriptionPlansByRole,
  GetCurrentUserSubscription,
  CreatePaymentForm,
  clearSubscriptionError,
  resetSubscriptionSuccess,
} from "../../features/subscription/subscriptionSlice";
import SubscriptionPlanCard from "../../components/subscription/SubscriptionPlanCard";
import SubscriptionComparisonTable from "../../components/subscription/SubscriptionComparisonTable";
import PaymentDialog from "../../components/subscription/PaymentDialog";
import SubscriptionFAQ from "../../components/subscription/SubscriptionFAQ";
import NotificationSnackbar from "../../components/common/NotificationSnackbar";
import roles from "../../config/roles";

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

  const countryCode = profile?.country || "US";
  const languageCode = profile?.preferredLanguage || "en";

  useEffect(() => {
    const roleId = user?.roleId || roles.PATIENT;

    dispatch(
      GetSubscriptionPlansByRole({
        roleId,
        countryCode,
        languageCode,
      })
    );
    dispatch(GetCurrentUserSubscription());

    return () => {
      dispatch(clearSubscriptionError());
      dispatch(resetSubscriptionSuccess());
    };
  }, [dispatch, countryCode, languageCode, user?.roleId]);

  const handlePlanSelect = (planId) => {
    const plan = availablePlans?.find(
      (p) => p.planId?.toString() === planId?.toString()
    );
    if (plan) {
      setSelectedPlan(plan);
      setOpenPaymentDialog(true);
    } else {
      setNotification({
        open: true,
        message: t("selectedPlanNotFound"),
        severity: "error",
      });
    }
  };

  const handlePaymentDialogClose = () => {
    setOpenPaymentDialog(false);
    setSelectedPlan(null);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPlan) {
      setNotification({
        open: true,
        message: t("noPlanSelected"),
        severity: "error",
      });
      return;
    }

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

  useEffect(() => {
    if (paymentForm && success) {
      if (paymentForm.formContent) {
        try {
          const container = document.createElement("div");
          container.innerHTML = paymentForm.formContent;
          document.body.appendChild(container);

          setOpenPaymentDialog(false);

          setNotification({
            open: true,
            message: t("redirectingToPaymentPage"),
            severity: "info",
          });
        } catch (e) {
          setNotification({
            open: true,
            message: t("paymentFormLoadError"),
            severity: "error",
          });
        }
      } else {
        setNotification({
          open: true,
          message: t("paymentFormContentNotAvailable"),
          severity: "error",
        });
      }
    }
  }, [paymentForm, success, t]);

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

  const getCurrentPlanId = () => {
    if (currentSubscription?.subscription?.planId) {
      return currentSubscription.subscription.planId;
    }
    return "free";
  };

  const getSelectedPlanInfo = () => {
    if (!selectedPlan) return { name: "", price: "", currencyCode: "" };

    return {
      name: selectedPlan.name || "",
      price: selectedPlan.price || 0,
      currencyCode: selectedPlan.currencyCode || "",
    };
  };

  const selectedPlanInfo = getSelectedPlanInfo();
  const currentPlanId = getCurrentPlanId();

  const safePlans = availablePlans || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {t("subscriptionPlans")}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t("chooseThePlanThatFitsYourNeeds")}
        </Typography>
      </Box>

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
                {loading ? (
                  <Skeleton variant="text" width={200} height={30} />
                ) : (
                  <Typography variant="h6">
                    {t("currentPlan")}:{" "}
                    <Box component="span" sx={{ fontWeight: "bold" }}>
                      {t((currentPlanId || "free") + "Plan")}
                    </Box>
                  </Typography>
                )}
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
              disabled={loading}
            >
              {t("billingHistory")}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {t("comparePlans")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("selectThePlanThatBestFitsYourNeeds")}
        </Typography>
      </Box>

      {loading ? (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Skeleton variant="rectangular" height={400} />
            </Grid>
          ))}
        </Grid>
      ) : safePlans.length > 0 ? (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {safePlans.map((plan) => (
            <Grid item xs={12} sm={6} md={3} key={plan?.id || Math.random()}>
              <SubscriptionPlanCard
                plan={plan}
                currentPlan={currentPlanId}
                onSelect={handlePlanSelect}
                onContactUs={handleContactUs}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info" sx={{ mb: 4 }}>
          {t("noSubscriptionPlansAvailable")}
        </Alert>
      )}

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          {t("detailedFeatureComparison")}
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" height={300} />
        ) : safePlans.length > 0 ? (
          <SubscriptionComparisonTable plans={safePlans} />
        ) : (
          <Alert severity="info">{t("featureComparisonNotAvailable")}</Alert>
        )}
      </Box>

      <Box sx={{ mb: 12 }}>
        <SubscriptionFAQ />
      </Box>

      <PaymentDialog
        open={openPaymentDialog}
        onClose={handlePaymentDialogClose}
        selectedPlan={selectedPlan?.id}
        planName={selectedPlanInfo.name}
        planPrice={selectedPlanInfo.price}
        currencyCode={selectedPlanInfo.currencyCode}
        profile={profile}
        onConfirmPayment={handlePaymentSubmit}
        isLoading={loading}
      />

      <NotificationSnackbar
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        severity={notification.severity}
      />
    </Container>
  );
};

export default SubscriptionPlans;
