import React from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  LinearProgress,
  alpha,
} from "@mui/material";
import { Message, ArrowForward, CalendarToday } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SessionStats = ({
  totalSessions,
  completedSessions,
  activeSessions,
  navigate,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 4,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.light,
          0.05
        )}, ${alpha(theme.palette.primary.main, 0.1)})`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {t("aiSessionsStats")}
        </Typography>
        <Chip
          icon={<Message />}
          label={`${t("totalSessions")}: ${totalSessions}`}
          color="primary"
          variant="outlined"
          sx={{ borderRadius: 3 }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={500}
            >
              {t("completedSessions")}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {completedSessions}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                totalSessions > 0
                  ? (completedSessions / totalSessions) * 100
                  : 0
              }
              sx={{ mt: 1, height: 6, borderRadius: 3 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={500}
            >
              {t("activeSessions")}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="success.main">
              {activeSessions.length}
            </Typography>
            {activeSessions.length > 0 ? (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/therapy-chat")}
                sx={{ mt: 1, borderRadius: 6, textTransform: "none" }}
              >
                {t("continueSession")}
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t("noActiveSessions")}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SessionStats;
