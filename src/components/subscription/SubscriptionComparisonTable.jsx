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

const SubscriptionComparisonTable = ({ plans }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const safePlans = plans || [];

  if (!safePlans.length) {
    return <Alert severity="info">{t("noPlansAvailableForComparison")}</Alert>;
  }

  const featureCategories = [
    {
      id: "moodEntries",
      icon: <EmojiEmotions sx={{ mr: 1, color: "primary.main" }} />,
      title: t("moodEntries"),
      values: {
        free: { text: t("onePerDay"), available: true },
        standard: { text: t("unlimited"), available: true },
        premium: { text: t("unlimited"), available: true },
        pro: { text: t("unlimited"), available: true },
      },
    },
    {
      id: "aiChat",
      icon: <ChatBubbleOutline sx={{ mr: 1, color: "primary.main" }} />,
      title: t("aiChatSessions"),
      values: {
        free: {
          text: t("onePerWeek"),
          available: true,
          subtext: `(5-10 ${t("messages")})`,
        },
        standard: {
          text: t("threePerWeek"),
          available: true,
          subtext: `(30 ${t("messages")})`,
        },
        premium: { text: t("unlimited"), available: true },
        pro: { text: t("unlimited"), available: true },
      },
    },
    {
      id: "psychologist",
      icon: <Psychology sx={{ mr: 1, color: "primary.main" }} />,
      title: t("psychologistSupport"),
      values: {
        free: { text: "", available: false },
        standard: { text: "", available: false },
        premium: {
          text: `2 ${t("sessionsPerMonth")}`,
          available: true,
        },
        pro: {
          text: t("customized"),
          available: true,
        },
      },
    },
    {
      id: "reports",
      icon: <BarChart sx={{ mr: 1, color: "primary.main" }} />,
      title: t("reportsAndAnalytics"),
      values: {
        free: { text: "", available: false },
        standard: { text: t("monthly"), available: true },
        premium: { text: t("weekly"), available: true },
        pro: { text: t("customDashboards"), available: true },
      },
    },
    {
      id: "emergency",
      icon: <CalendarToday sx={{ mr: 1, color: "primary.main" }} />,
      title: t("emergencySupport"),
      values: {
        free: { text: "", available: false },
        standard: { text: t("aiOnly"), available: true },
        premium: { text: t("fullSupport"), available: true },
        pro: { text: t("prioritySupport"), available: true },
      },
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
                  key={plan?.id || Math.random()}
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
                    sx={{ color: plan?.color || "primary.main" }}
                  >
                    {plan?.title || t("unknownPlan")}
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
                  const planId = plan?.id || "free";
                  const value = category.values[planId] || {
                    available: false,
                    text: "",
                  };

                  return (
                    <Box
                      key={`${category.id}-${planId}`}
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
