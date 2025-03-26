import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  LinearProgress,
  useTheme,
} from "@mui/material";
import {
  Schedule,
  CalendarToday,
  People,
  Star,
  TrendingUp,
  Visibility,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Stats card component for psychologist profile
 * Displays key performance metrics and appointment statistics
 */
const PsychologistStatsCard = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Sample data for statistics
  // In a real app, this would come from props or API
  const stats = {
    totalSessions: 156,
    upcomingAppointments: 5,
    completedThisMonth: 22,
    averageRating: 4.8,
    profileViews: 127,
    bookedPercentage: 85,
  };

  // Function to render a stat item
  const StatItem = ({ icon, label, value, color }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box
        sx={{
          backgroundColor: `${color || "primary.main"}20`,
          borderRadius: 2,
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
          color: color || "primary.main",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}
    >
      {/* Appointment Statistics Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            {t("appointmentStatistics")}
          </Typography>

          <StatItem
            icon={<Schedule />}
            label={t("totalSessions")}
            value={stats.totalSessions}
          />

          <StatItem
            icon={<CalendarToday />}
            label={t("upcomingAppointments")}
            value={stats.upcomingAppointments}
            color={theme.palette.success.main}
          />

          <StatItem
            icon={<People />}
            label={t("completedThisMonth")}
            value={stats.completedThisMonth}
            color={theme.palette.info.main}
          />

          <StatItem
            icon={<Star />}
            label={t("averageRating")}
            value={`${stats.averageRating}/5.0`}
            color="#FFB400"
          />

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              {t("viewAllAppointments")}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Profile Performance Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            {t("profilePerformance")}
          </Typography>

          <StatItem
            icon={<Visibility />}
            label={t("profileViews")}
            value={stats.profileViews}
            color={theme.palette.secondary.main}
          />

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {t("bookingRate")}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {stats.bookedPercentage}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={stats.bookedPercentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: `${theme.palette.primary.main}20`,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                },
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<TrendingUp />}
              sx={{
                borderRadius: 2,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >
              {t("boostYourProfile")}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Upcoming Session Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "visible",
          bgcolor: "primary.light",
          color: "white",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "white" }}
          >
            {t("nextSession")}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.8, color: "white" }}>
              {t("patientName")}:
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "white", mb: 1 }}
            >
              Ahmet Yılmaz
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.8, color: "white" }}>
              {t("sessionTime")}:
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "white" }}
            >
              24 Mart 2025, 14:30
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              fullWidth
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              {t("prepareNotes")}
            </Button>
            <Button
              variant="contained"
              size="small"
              fullWidth
              sx={{
                bgcolor: "white",
                color: "primary.main",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              {t("joinSession")}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PsychologistStatsCard;
