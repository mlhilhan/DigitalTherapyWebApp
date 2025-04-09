import React from "react";
import { Box, Typography, Paper, useTheme, Alert } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  Cancel,
  CheckCircle,
  EmojiEmotions,
  ChatBubbleOutline,
  Psychology,
  BarChart,
  CalendarToday,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/formattedPrice";

const SubscriptionComparisonTable = ({ plans }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const safePlans = plans || [];

  if (!safePlans.length) {
    return <Alert severity="info">{t("noPlansAvailableForComparison")}</Alert>;
  }

  const featureCategories = [
    {
      id: "price",
      icon: null,
      title: t("price"),
      getValue: (plan) => ({
        text: formatCurrency(plan.price, plan.currencyCode),
        available: true,
      }),
    },
    {
      id: "moodEntries",
      icon: <EmojiEmotions sx={{ mr: 1, color: "primary.main" }} />,
      title: t("moodEntries"),
      getValue: (plan) => ({
        text:
          plan.moodEntryLimit === -1
            ? t("unlimited")
            : `${plan.moodEntryLimit} ${t("perDay")}`,
        available: true,
      }),
    },
    {
      id: "aiChat",
      icon: <ChatBubbleOutline sx={{ mr: 1, color: "primary.main" }} />,
      title: t("aiChatSessions"),
      getValue: (plan) => ({
        text:
          plan.aiChatSessionsPerWeek === -1
            ? t("unlimited")
            : `${plan.aiChatSessionsPerWeek} ${t("perWeek")}`,
        available: true,
        subtext:
          plan.messageLimitPerChat === -1
            ? undefined
            : `(${plan.messageLimitPerChat} ${t("messages")})`,
      }),
    },
    {
      id: "psychologist",
      icon: <Psychology sx={{ mr: 1, color: "primary.main" }} />,
      title: t("psychologistSupport"),
      getValue: (plan) => ({
        text: plan.hasPsychologistSupport
          ? plan.psychologistSessionsPerMonth > 0
            ? `${plan.psychologistSessionsPerMonth} ${t("sessionsPerMonth")}`
            : t("customized")
          : "",
        available: plan.hasPsychologistSupport,
      }),
    },
    {
      id: "reports",
      icon: <BarChart sx={{ mr: 1, color: "primary.main" }} />,
      title: t("reportsAndAnalytics"),
      getValue: (plan) => ({
        text: plan.hasAdvancedReports
          ? plan.planId === "pro"
            ? t("customDashboards")
            : plan.planId === "premium"
            ? t("weekly")
            : t("monthly")
          : "",
        available: plan.hasAdvancedReports,
      }),
    },
    {
      id: "emergency",
      icon: <CalendarToday sx={{ mr: 1, color: "primary.main" }} />,
      title: t("emergencySupport"),
      getValue: (plan) => ({
        text: plan.hasEmergencySupport
          ? plan.planId === "pro"
            ? t("prioritySupport")
            : plan.planId === "premium"
            ? t("fullSupport")
            : t("aiOnly")
          : "",
        available: plan.hasEmergencySupport,
      }),
    },
  ];

  return (
    <Paper sx={{ overflow: "hidden", borderRadius: 2 }}>
      <Box sx={{ overflowX: "auto" }}>
        <Box
          sx={{
            minWidth: 800,
            display: "table",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <Box
            sx={{
              display: "table-header-group",
              backgroundColor: "background.default",
            }}
          >
            <Box sx={{ display: "table-row" }}>
              <Box
                sx={{
                  display: "table-cell",
                  p: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  width: "30%",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {t("features")}
                </Typography>
              </Box>
              {safePlans.map((plan) => (
                <Box
                  key={plan?.planId || Math.random()}
                  sx={{
                    display: "table-cell",
                    p: 2,
                    textAlign: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    width: `${70 / safePlans.length}%`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{
                      color:
                        plan?.planId === "premium"
                          ? "warning.main"
                          : plan?.planId === "standard"
                          ? "primary.main"
                          : plan?.planId === "pro"
                          ? "success.main"
                          : "text.primary",
                    }}
                  >
                    {plan?.name || t("unknownPlan")}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "table-row-group" }}>
            {featureCategories.map((category) => (
              <Box sx={{ display: "table-row" }} key={category.id}>
                <Box
                  sx={{
                    display: "table-cell",
                    p: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    backgroundColor: alpha(
                      theme.palette.background.default,
                      0.5
                    ),
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {category.icon}
                    <Typography variant="body2" fontWeight="medium">
                      {category.title}
                    </Typography>
                  </Box>
                </Box>
                {safePlans.map((plan) => {
                  const value = category.getValue(plan);

                  return (
                    <Box
                      key={`${category.id}-${plan.planId}`}
                      sx={{
                        display: "table-cell",
                        p: 2,
                        textAlign: "center",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {value.available ? (
                        <Typography variant="body2">
                          {value.text}
                          {value.subtext && (
                            <Typography variant="caption" display="block">
                              {value.subtext}
                            </Typography>
                          )}
                        </Typography>
                      ) : (
                        <Cancel sx={{ color: "text.disabled" }} />
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default SubscriptionComparisonTable;
