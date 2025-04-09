import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  Skeleton,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  ArrowForward,
  Subscriptions,
  Star,
  Psychology,
  BusinessCenter,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SubscriptionPlanCard = ({ plan, currentPlan, onSelect, onContactUs }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formatCurrency = (amount, currencyCode) => {
    const currencySymbols = {
      USD: "$",
      EUR: "€",
      TRY: "₺",
      GBP: "£",
    };

    const symbol = currencySymbols[currencyCode] || currencyCode;
    return `${symbol}${amount.toFixed(2)}`;
  };

  if (!plan) {
    return (
      <Card
        elevation={1}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center">
            {t("planInformationNotAvailable")}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const isCurrentPlan = currentPlan === plan.planId;
  const buttonText = isCurrentPlan
    ? t("currentPlan")
    : plan.isContactUs
    ? t("contactUs")
    : t("selectPlan");
  const buttonVariant = isCurrentPlan ? "outlined" : "contained";
  const buttonDisabled = isCurrentPlan;

  const isRecommended = plan.planId === "premium";

  const planIcon =
    plan.planId === "free" ? (
      <Subscriptions />
    ) : plan.planId === "standard" ? (
      <Star />
    ) : plan.planId === "premium" ? (
      <Psychology />
    ) : (
      <BusinessCenter />
    );

  const planColor =
    plan.planId === "free"
      ? theme.palette.grey[600]
      : plan.planId === "standard"
      ? theme.palette.primary.main
      : plan.planId === "premium"
      ? theme.palette.warning.main
      : theme.palette.success.main;

  const planFeatures = [
    {
      text: t("moodEntries"),
      available: true,
      limit:
        plan.moodEntryLimit === -1
          ? t("unlimited")
          : `${plan.moodEntryLimit} ${t("perDay")}`,
    },
    {
      text: t("aiChatSessions"),
      available: true,
      limit:
        plan.aiChatSessionsPerWeek === -1
          ? t("unlimited")
          : `${plan.aiChatSessionsPerWeek} ${t("perWeek")}`,
    },
    {
      text: t("psychologistSupport"),
      available: plan.hasPsychologistSupport,
      limit: plan.hasPsychologistSupport
        ? `${plan.psychologistSessionsPerMonth} ${t("sessionsPerMonth")}`
        : "",
    },
    {
      text: t("reportsAndAnalytics"),
      available: plan.hasAdvancedReports,
    },
    {
      text: t("emergencySupport"),
      available: plan.hasEmergencySupport,
    },
  ];

  const handleButtonClick = () => {
    if (plan.isContactUs) {
      onContactUs();
    } else if (!isCurrentPlan) {
      onSelect(plan.planId);
    }
  };

  return (
    <Card
      elevation={isRecommended ? 4 : 1}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: 2,
        transition: "transform 0.3s, box-shadow 0.3s",
        border: isRecommended ? `2px solid ${planColor}` : "1px solid",
        borderColor: isRecommended ? planColor : "divider",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      {isRecommended && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: -32,
            backgroundColor: theme.palette.primary.main,
            color: "white",
            transform: "rotate(45deg)",
            transformOrigin: "center",
            width: 150,
            textAlign: "center",
            py: 0.5,
            zIndex: 1,
            fontWeight: "bold",
            fontSize: "0.75rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {t("recommended")}
        </Box>
      )}
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: alpha(planColor, 0.1),
                color: planColor,
                mr: 1,
              }}
            >
              {planIcon}
            </Box>
            <Typography variant="h6">
              {plan.name || t("unknownPlan")}
            </Typography>
          </Box>
        }
        subheader={plan.description || ""}
        titleTypographyProps={{ fontWeight: "bold" }}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
        <Box sx={{ my: 2 }}>
          <Typography
            variant="h4"
            component="div"
            fontWeight="bold"
            sx={{ display: "inline" }}
          >
            {typeof plan.price === "number"
              ? `${
                  plan.currencyCode === "USD"
                    ? "$"
                    : plan.currencyCode === "TRY"
                    ? "₺"
                    : plan.currencyCode
                }${plan.price}`
              : plan.price || t("free")}
          </Typography>

          {plan.durationInDays && (
            <Typography
              variant="subtitle1"
              component="span"
              color="text.secondary"
            >
              /{t("monthly")}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <List dense sx={{ py: 0 }}>
          {planFeatures && planFeatures.length > 0 ? (
            planFeatures.map((feature, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {feature.available ? (
                    <CheckCircle
                      fontSize="small"
                      sx={{ color: "success.main" }}
                    />
                  ) : (
                    <Cancel fontSize="small" sx={{ color: "text.disabled" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        color: feature.available
                          ? "text.primary"
                          : "text.disabled",
                        fontWeight: feature.available ? 500 : 400,
                      }}
                    >
                      {feature.text || ""}
                      {feature.limit && (
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ color: "text.secondary", ml: 0.5 }}
                        >
                          ({feature.limit})
                        </Typography>
                      )}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.secondary">
                    {t("noFeaturesAvailable")}
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant={buttonVariant}
          color={isRecommended ? "primary" : "inherit"}
          size="large"
          disabled={buttonDisabled}
          onClick={handleButtonClick}
          sx={{
            borderRadius: 8,
            py: 1.5,
            fontWeight: "bold",
            boxShadow: isRecommended ? 2 : 0,
          }}
          endIcon={buttonDisabled ? null : <ArrowForward />}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};

export default SubscriptionPlanCard;
