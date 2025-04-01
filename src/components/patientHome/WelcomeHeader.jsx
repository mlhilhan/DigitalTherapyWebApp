import React from "react";
import { Box, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const WelcomeHeader = ({ userName }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          mb: 1,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("welcomeBack")}, {userName || t("user")}
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ maxWidth: 600, mx: "auto", mb: 3 }}
      >
        {t("dashboardIntroText")}
      </Typography>
    </Box>
  );
};

export default WelcomeHeader;
