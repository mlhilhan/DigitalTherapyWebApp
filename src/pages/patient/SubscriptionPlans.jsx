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
import SubscriptionPlanCard from "../../components/subscription/SubscriptionPlanCard";
import SubscriptionComparisonTable from "../../components/subscription/SubscriptionComparisonTable";
import PaymentDialog from "../../components/subscription/PaymentDialog";
import SubscriptionFAQ from "../../components/subscription/SubscriptionFAQ";

const SubscriptionPlans = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    // Kullanıcının mevcut abonelik planını getir
    const loadSubscriptionData = async () => {
      setIsLoading(true);
      try {
        // Gerçek API çağrısı burada yapılacak
        // await dispatch(GetUserSubscription()).unwrap();

        // Demo amaçlı, sahte veri
        setTimeout(() => {
          setCurrentPlan("standard");
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Abonelik verileri yüklenirken hata oluştu:", error);
        setIsLoading(false);
      }
    };

    loadSubscriptionData();
  }, [dispatch]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setOpenPaymentDialog(true);
  };

  const handlePaymentDialogClose = () => {
    setOpenPaymentDialog(false);
    setSelectedPlan(null);
  };

  const handlePaymentSubmit = () => {
    // Ödeme işlemi burada gerçekleştirilecek
    setIsLoading(true);

    // Sahte abonelik güncelleme API çağrısı
    setTimeout(() => {
      setCurrentPlan(selectedPlan);
      setOpenPaymentDialog(false);
      setNotification({
        open: true,
        message: t("subscriptionUpdatedSuccessfully"),
        severity: "success",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleContactUs = () => {
    navigate("/contact-us");
  };

  const showNotification = (message, severity = "info") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  // Abonelik planları verileri
  const plans = [
    {
      id: "free",
      title: t("freePlan"),
      subtitle: t("tryBeforeYouBuy"),
      price: "0",
      period: t("month"),
      color: theme.palette.info.main,
      icon: <Info />,
      features: [
        { text: t("oneMoodEntryPerDay"), available: true },
        {
          text: t("oneAIChatPerWeek"),
          available: true,
          limit: "5-10 " + t("messages"),
        },
        { text: t("limitedDailyTips"), available: true },
        { text: t("advancedReports"), available: false },
        { text: t("unlimitedMoodEntries"), available: false },
        { text: t("unlimitedAIChats"), available: false },
        { text: t("psychologistChatSupport"), available: false },
        { text: t("meditationExercises"), available: false },
      ],
      recommended: false,
    },
    {
      id: "standard",
      title: t("standardPlan"),
      subtitle: t("mostPopular"),
      price: "29.99",
      period: t("month"),
      color: theme.palette.primary.main,
      icon: <Psychology />,
      features: [
        { text: t("unlimitedMoodEntries"), available: true },
        {
          text: t("threeAIChatsPerWeek"),
          available: true,
          limit: "30 " + t("messagesPerChat"),
        },
        { text: t("dailyAdvancedTips"), available: true },
        { text: t("monthlyReports"), available: true },
        { text: t("moodTrendGraphs"), available: true },
        { text: t("goalSetting"), available: true },
        { text: t("selectedMeditationContent"), available: true },
        { text: t("psychologistChatSupport"), available: false },
      ],
      recommended: true,
    },
    {
      id: "premium",
      title: t("premiumPlan"),
      subtitle: t("completeExperience"),
      price: "59.99",
      period: t("month"),
      color: theme.palette.secondary.main,
      icon: <Star />,
      features: [
        { text: t("unlimitedMoodEntries"), available: true },
        { text: t("unlimitedAIChats"), available: true },
        { text: t("personalizedTipsAndTasks"), available: true },
        { text: t("weeklyDetailedReports"), available: true },
        { text: t("advancedAnalytics"), available: true },
        { text: t("allMeditationContent"), available: true },
        {
          text: t("psychologistChatSupport"),
          available: true,
          limit: "2 " + t("sessionsPerMonth"),
        },
        { text: t("emergencySupport"), available: true },
      ],
      recommended: false,
    },
    {
      id: "pro",
      title: t("proPlan"),
      subtitle: t("forOrganizations"),
      price: t("custom"),
      period: "",
      color: theme.palette.error.main,
      icon: <BusinessCenter />,
      features: [
        { text: t("allPremiumFeatures"), available: true },
        { text: t("customBranding"), available: true },
        { text: t("dedicatedSupport"), available: true },
        { text: t("teamDashboard"), available: true },
        { text: t("organizationReports"), available: true },
        { text: t("apiAccess"), available: true },
        { text: t("customIntegrations"), available: true },
        { text: t("contactSales"), available: true },
      ],
      recommended: false,
      isContactUs: true,
    },
  ];

  // Seçilen plan için fiyat ve isim bilgilerini al
  const getSelectedPlanInfo = () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    return {
      name: plan ? plan.title : "",
      price: plan ? plan.price : "",
    };
  };

  const selectedPlanInfo = getSelectedPlanInfo();

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
                    {t(currentPlan + "Plan")}
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
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={3} key={plan.id}>
            <SubscriptionPlanCard
              plan={plan}
              currentPlan={currentPlan}
              onSelect={handlePlanSelect}
              onContactUs={handleContactUs}
            />
          </Grid>
        ))}
      </Grid>

      {/* Detaylı Özellik Karşılaştırma Bölümü */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          {t("detailedFeatureComparison")}
        </Typography>
        <SubscriptionComparisonTable plans={plans} />
      </Box>

      {/* SSS Bölümü */}
      <SubscriptionFAQ />

      {/* Ödeme Dialog'u */}
      <PaymentDialog
        open={openPaymentDialog}
        onClose={handlePaymentDialogClose}
        selectedPlan={selectedPlan}
        planName={selectedPlanInfo.name}
        planPrice={selectedPlanInfo.price}
        profile={profile}
        onConfirmPayment={handlePaymentSubmit}
        isLoading={isLoading}
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
