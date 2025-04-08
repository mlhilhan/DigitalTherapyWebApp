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
import { CheckCircle, Cancel, ArrowForward } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SubscriptionPlanCard = ({ plan, currentPlan, onSelect, onContactUs }) => {
  const { t } = useTranslation();
  const theme = useTheme();

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

  const isCurrentPlan = currentPlan === plan.id;
  const buttonText = isCurrentPlan
    ? t("currentPlan")
    : plan.isContactUs
    ? t("contactUs")
    : t("selectPlan");
  const buttonVariant = isCurrentPlan ? "outlined" : "contained";
  const buttonDisabled = isCurrentPlan;

  const handleButtonClick = () => {
    if (plan.isContactUs) {
      onContactUs();
    } else if (!isCurrentPlan) {
      onSelect(plan.id);
    }
  };

  const planColor = plan.color || theme.palette.primary.main;

  return (
    <Card
      elevation={plan.recommended ? 4 : 1}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: 2,
        transition: "transform 0.3s, box-shadow 0.3s",
        border: plan.recommended ? `2px solid ${planColor}` : "1px solid",
        borderColor: plan.recommended ? planColor : "divider",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      {plan.recommended && (
        <Chip
          label={t("recommended")}
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            top: -10,
            right: 20,
            fontWeight: "bold",
          }}
        />
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
              {plan.icon || null}
            </Box>
            <Typography variant="h6">
              {plan.title || t("unknownPlan")}
            </Typography>
          </Box>
        }
        subheader={plan.subtitle || ""}
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
              ? `₺${plan.price}`
              : plan.price || t("free")}
          </Typography>
          {plan.period && (
            <Typography
              variant="subtitle1"
              component="span"
              color="text.secondary"
            >
              /{plan.period}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <List dense sx={{ py: 0 }}>
          {plan.features && plan.features.length > 0 ? (
            plan.features.map((feature, index) => (
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
          color={plan.recommended ? "primary" : "inherit"}
          size="large"
          disabled={buttonDisabled}
          onClick={handleButtonClick}
          sx={{
            borderRadius: 8,
            py: 1.5,
            fontWeight: "bold",
            boxShadow: plan.recommended ? 2 : 0,
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
