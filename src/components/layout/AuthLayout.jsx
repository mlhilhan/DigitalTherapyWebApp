import React from "react";
import { Paper, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const AuthLayout = ({ children }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100vw",
        height: isMobile ? "auto" : "100vh",
        minHeight: "100vh",
      }}
    >
      {/* Left */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          minHeight: isMobile ? "auto" : "100vh",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "24px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "450px",
            margin: isMobile ? "40px 0" : 0,
          }}
        >
          {children}
        </Paper>
      </div>

      {/* Right */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#6200EE",
          color: "white",
          padding: "40px 20px",
          minHeight: isMobile ? "50vh" : "100vh",
        }}
      >
        <Box style={{ textAlign: "center", maxWidth: "500px" }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            gutterBottom
          >
            {t("digitalTherapyAssistant")}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "16px" }}>
            Ruh sağlığınızı iyileştirmek için yapay zeka destekli çözüm. Günlük
            ruh halinizi takip edin, kişiselleştirilmiş öneriler alın.
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default AuthLayout;
