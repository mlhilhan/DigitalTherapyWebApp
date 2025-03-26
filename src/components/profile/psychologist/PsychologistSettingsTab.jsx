import React from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  useTheme,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import {
  NotificationsActive,
  VpnKey,
  Security,
  Visibility,
  Public,
  Schedule,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Settings tab component for psychologist profile
 * Displays account settings, notification preferences, privacy controls, etc.
 */
const PsychologistSettingsTab = ({ profile, onNotificationModalOpen }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        {t("accountSettings")}
      </Typography>

      <Grid container spacing={3}>
        {/* Notification Preferences */}
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderColor: "primary.light",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NotificationsActive color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t("notificationPreferences")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile?.notificationPreferences
                    ? t("notificationPreferencesConfigured")
                    : t("notificationPreferencesNotConfigured")}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={onNotificationModalOpen}
            >
              {t("manage")}
            </Button>
          </Card>
        </Grid>

        {/* Password Change */}
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderColor: "primary.light",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VpnKey color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t("password")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("lastUpdated")}: {profile?.passwordLastUpdated || "-"}
                </Typography>
              </Box>
            </Box>
            <Button variant="contained" size="small">
              {t("changePassword")}
            </Button>
          </Card>
        </Grid>

        {/* Two-Factor Authentication */}
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderColor: "primary.light",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Security color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t("twoFactorAuthentication")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("enhanceAccountSecurity")}
                </Typography>
              </Box>
            </Box>
            <Switch defaultChecked={false} />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6" sx={{ my: 2, fontWeight: 600 }}>
            {t("privacySettings")}
          </Typography>
        </Grid>

        {/* Profile Visibility */}
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2,
              boxShadow: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderColor: "primary.light",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Visibility color="primary" sx={{ mr: 2 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {t("profileVisibility")}
              </Typography>
            </Box>

            <Box sx={{ pl: 5 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t("showProfileInPublicDirectory")}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t("allowPatientsToFindMe")}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t("showMySpecializations")}
              />
            </Box>
          </Card>
        </Grid>

        {/* Calendar Settings */}
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2,
              boxShadow: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderColor: "primary.light",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Schedule color="primary" sx={{ mr: 2 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {t("calendarSettings")}
              </Typography>
            </Box>

            <Box sx={{ pl: 5 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t("showAvailabilityToPatients")}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t("allowOnlineBooking")}
              />
              <FormControlLabel
                control={<Switch defaultChecked={false} />}
                label={t("automaticallyAcceptAppointments")}
              />

              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" size="small">
                  {t("manageAvailability")}
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Data & Export */}
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderColor: "primary.light",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Public color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t("dataAndExport")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("exportYourData")}
                </Typography>
              </Box>
            </Box>
            <Button variant="outlined" size="small">
              {t("export")}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PsychologistSettingsTab;
