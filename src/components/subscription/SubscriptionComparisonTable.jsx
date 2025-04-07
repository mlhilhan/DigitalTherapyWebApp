import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
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

  // Define the feature categories we want to display
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
          {/* Table Header */}
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
              {plans.map((plan) => (
                <Box
                  key={plan.id}
                  sx={{
                    display: "table-cell",
                    p: 2,
                    textAlign: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    width: `${70 / plans.length}%`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ color: plan.color }}
                  >
                    {plan.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Table Body - Features */}
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
                {plans.map((plan) => {
                  const value = category.values[plan.id];

                  return (
                    <Box
                      key={`${category.id}-${plan.id}`}
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
