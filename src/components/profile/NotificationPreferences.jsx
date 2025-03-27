import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  Divider,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Collapse,
  Alert,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  NotificationsActive,
  Email,
  Smartphone,
  ExpandMore,
  ExpandLess,
  Info,
  Close,
  Save,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Bu fonksiyon, gerçek uygulamanızda Redux slice'ınızdan gelmelidir
const updateNotificationPreferences = (userId, preferences) => {
  // Burada API çağrısı yapılacak
  return {
    type: "UPDATE_NOTIFICATION_PREFERENCES",
    payload: { userId, preferences },
  };
};

const NotificationPreferences = ({ onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  // Varsayılan bildirim tercihleri
  const defaultPreferences = {
    emailNotifications: true,
    pushNotifications: true,
    moodReminders: true,
    appointmentReminders: true,
    therapistMessages: true,
    systemUpdates: false,
    contentRecommendations: true,
    reminderFrequency: "daily",
    notifyBeforeAppointment: 60, // dakika cinsinden
  };

  // Kullanıcının mevcut bildirim tercihlerini alıyoruz
  // Gerçek uygulamanızda bu bilgiler profile'den gelmelidir
  const [preferences, setPreferences] = useState(
    profile?.notificationPreferences || defaultPreferences
  );
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    appointments: true,
    reminders: true,
    content: false,
  });
  const [isSaving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (
      name.includes("Notifications") ||
      name.includes("Reminders") ||
      name.includes("Messages") ||
      name.includes("Updates") ||
      name.includes("Recommendations")
    ) {
      setPreferences({
        ...preferences,
        [name]: checked,
      });
    } else {
      setPreferences({
        ...preferences,
        [name]: value,
      });
    }

    if (saveSuccess) setSaveSuccess(false);
  };

  const handleSave = () => {
    setSaving(true);

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      dispatch(updateNotificationPreferences(user.userId, preferences));
      setSaving(false);
      setSaveSuccess(true);
      toast.success(t("notificationPreferencesSaved"));
    }, 1000);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <NotificationsActive sx={{ color: "primary.main", mr: 1.5 }} />
            <Typography variant="h6">{t("notificationPreferences")}</Typography>
          </Box>
          <IconButton onClick={onClose} edge="end">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Collapse in={saveSuccess}>
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setSaveSuccess(false)}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {t("notificationPreferencesSaved")}
          </Alert>
        </Collapse>

        {/* Genel Bildirimler */}
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent sx={{ pb: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => toggleSection("general")}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {t("generalNotifications")}
              </Typography>
              <IconButton size="small">
                {expandedSections.general ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            <Collapse in={expandedSections.general}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.emailNotifications}
                        onChange={handleChange}
                        name="emailNotifications"
                        color="primary"
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <Email
                          fontSize="small"
                          sx={{ mr: 1, color: "primary.main" }}
                        />
                        <Typography variant="body2">
                          {t("emailNotifications")}
                        </Typography>
                      </Box>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.pushNotifications}
                        onChange={handleChange}
                        name="pushNotifications"
                        color="primary"
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <Smartphone
                          fontSize="small"
                          sx={{ mr: 1, color: "primary.main" }}
                        />
                        <Typography variant="body2">
                          {t("pushNotifications")}
                        </Typography>
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
            </Collapse>
          </CardContent>
        </Card>

        {/* Hatırlatıcılar */}
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent sx={{ pb: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => toggleSection("reminders")}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {t("reminderSettings")}
              </Typography>
              <IconButton size="small">
                {expandedSections.reminders ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            <Collapse in={expandedSections.reminders}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.moodReminders}
                        onChange={handleChange}
                        name="moodReminders"
                        color="primary"
                      />
                    }
                    label={t("moodTrackerReminders")}
                  />
                </Grid>

                {preferences.moodReminders && (
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="reminder-frequency-label">
                        {t("reminderFrequency")}
                      </InputLabel>
                      <Select
                        labelId="reminder-frequency-label"
                        value={preferences.reminderFrequency}
                        label={t("reminderFrequency")}
                        name="reminderFrequency"
                        onChange={handleChange}
                      >
                        <MenuItem value="daily">{t("daily")}</MenuItem>
                        <MenuItem value="weekdays">
                          {t("weekdaysOnly")}
                        </MenuItem>
                        <MenuItem value="weekly">{t("weekly")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            </Collapse>
          </CardContent>
        </Card>

        {/* Randevu Bildirimleri */}
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent sx={{ pb: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => toggleSection("appointments")}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {t("appointmentNotifications")}
              </Typography>
              <IconButton size="small">
                {expandedSections.appointments ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </IconButton>
            </Box>

            <Collapse in={expandedSections.appointments}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.appointmentReminders}
                        onChange={handleChange}
                        name="appointmentReminders"
                        color="primary"
                      />
                    }
                    label={t("appointmentReminders")}
                  />
                </Grid>

                {preferences.appointmentReminders && (
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="notify-before-label">
                        {t("notifyBeforeAppointment")}
                      </InputLabel>
                      <Select
                        labelId="notify-before-label"
                        value={preferences.notifyBeforeAppointment}
                        label={t("notifyBeforeAppointment")}
                        name="notifyBeforeAppointment"
                        onChange={handleChange}
                      >
                        <MenuItem value={15}>15 {t("minutes")}</MenuItem>
                        <MenuItem value={30}>30 {t("minutes")}</MenuItem>
                        <MenuItem value={60}>1 {t("hour")}</MenuItem>
                        <MenuItem value={120}>2 {t("hours")}</MenuItem>
                        <MenuItem value={1440}>1 {t("day")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.therapistMessages}
                        onChange={handleChange}
                        name="therapistMessages"
                        color="primary"
                      />
                    }
                    label={t("therapistMessages")}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </CardContent>
        </Card>

        {/* İçerik ve Güncellemeler */}
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent sx={{ pb: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => toggleSection("content")}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {t("contentAndUpdates")}
              </Typography>
              <IconButton size="small">
                {expandedSections.content ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            <Collapse in={expandedSections.content}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.contentRecommendations}
                        onChange={handleChange}
                        name="contentRecommendations"
                        color="primary"
                      />
                    }
                    label={t("contentRecommendations")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.systemUpdates}
                        onChange={handleChange}
                        name="systemUpdates"
                        color="primary"
                      />
                    }
                    label={t("systemUpdates")}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </CardContent>
        </Card>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? t("saving") : t("savePreferences")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationPreferences;
