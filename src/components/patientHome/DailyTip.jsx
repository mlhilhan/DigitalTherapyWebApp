import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  alpha,
} from "@mui/material";
import { Bolt, SelfImprovement } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const DailyTip = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Bolt sx={{ mr: 1 }} />
          <Typography
            variant="overline"
            fontWeight={600}
            sx={{ letterSpacing: 1 }}
          >
            {t("dailyTip")}
          </Typography>
        </Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t("deepBreathingTitle")}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
          {t("deepBreathingDesc")}
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<SelfImprovement />}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.3)",
            },
            borderRadius: 6,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {t("tryNow")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyTip;
