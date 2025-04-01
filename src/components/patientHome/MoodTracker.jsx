import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const MoodTracker = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        border: `1px solid ${alpha("#000", 0.05)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t("howAreYouFeeling")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("trackYourMoodDaily")}
        </Typography>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          {["😊", "😐", "😔", "😡", "😴"].map((emoji, index) => (
            <Grid item xs={2.4} key={index}>
              <Button
                variant="outlined"
                sx={{
                  minWidth: "auto",
                  width: "100%",
                  height: 48,
                  fontSize: "1.5rem",
                  borderRadius: 2,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  color: "text.primary",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                {emoji}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{
            mt: 1,
            borderRadius: 6,
            textTransform: "none",
            py: 1.2,
          }}
        >
          {t("trackMood")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
