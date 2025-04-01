import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  alpha,
} from "@mui/material";
import { WorkspacePremium, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SubscriptionInfoCard = ({ currentPlan = "standard" }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewSubscriptionPlans = () => {
    navigate("/patient-dashboard/subscription-plans");
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              color: theme.palette.warning.main,
              mr: 2,
            }}
          >
            <WorkspacePremium />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {t("subscriptionPlans")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("currentPlan")}:{" "}
              <Chip
                label={
                  currentPlan === "premium"
                    ? t("premiumPlan")
                    : t("standardPlan")
                }
                size="small"
                color={currentPlan === "premium" ? "warning" : "primary"}
                sx={{ height: 20, fontSize: "0.75rem" }}
              />
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t("subscriptionShortDescription")}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="warning"
          endIcon={<ArrowForward />}
          onClick={handleViewSubscriptionPlans}
          sx={{
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: 2,
          }}
        >
          {t("viewSubscriptionPlans")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionInfoCard;
