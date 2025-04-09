import React, { useState, useEffect, useCallback } from "react";
import { Container, Grid, Box, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  clearMessages,
  GetChatMessages,
  GetChatSessions,
  setActiveSession,
  setDrawerOpen,
  StartChatSession,
} from "../../features/therapyChat/therapyChatSlice";
import WelcomeHeader from "../../components/patientHome/WelcomeHeader";
import FeatureGrid from "../../components/patientHome/FeatureGrid";
import SessionStats from "../../components/patientHome/SessionStats";
import RecentSessions from "../../components/patientHome/RecentSessions";
import MoodTracker from "../../components/patientHome/MoodTracker";
import ResourcesList from "../../components/patientHome/ResourcesList";
import SubscriptionPlans from "../../components/patientHome/SubscriptionPlans";
import MoodEntryDialog from "../../components/mood/MoodEntryDialog";
import {
  getMoodColor,
  MOOD_FACTORS,
  MOOD_LEVELS,
} from "../../components/mood/utils/moodUtil";
import { CreateEmotionalState } from "../../features/emotionalState/emotionalStateSlice";
import NotificationSnackbar from "../../components/common/NotificationSnackbar";
import { GetCurrentUserSubscription } from "../../features/subscription/subscriptionSlice";

const PatientHome = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { sessions } = useSelector((state) => state.therapyChat);
  const [patientFullName, setPatientFullName] = useState("");
  const [openMoodDialog, setOpenMoodDialog] = useState(false);
  const [selectedMoodValue, setSelectedMoodValue] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const { currentSubscription, loading: subscriptionLoading } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(GetChatSessions()).unwrap();
        await dispatch(GetCurrentUserSubscription()).unwrap();
      } catch (error) {
        console.error("Error loading sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      const fullName = `${profile.firstName || ""} ${
        profile?.lastName || ""
      }`.trim();
      setPatientFullName(fullName);
    }
  }, [profile]);

  const getMoodLabel = useCallback(
    (moodLevel) => {
      const mood = Object.values(MOOD_LEVELS).find(
        (m) => m.value === moodLevel
      );
      return mood ? t(mood.label) : t(MOOD_LEVELS.NEUTRAL.label);
    },
    [t]
  );

  const showNotification = (message, severity = "info") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const activeSessions = sessions?.filter((s) => s.isActive) || [];
  const recentSessions = [...(sessions || [])]
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, 5);
  const totalAiSessions = sessions?.length || 0;
  const completedSessions =
    sessions?.filter((s) => s.status === "Completed")?.length || 0;

  const handleStartNewSession = async () => {
    try {
      dispatch(clearMessages());
      dispatch(setActiveSession(null));
      await dispatch(StartChatSession(true)).unwrap();
      await dispatch(GetChatSessions()).unwrap();

      navigate("/patient-dashboard/therapy-chat");
    } catch (error) {
      console.error("Yeni oturum başlatılırken hata oluştu:", error);
    }
  };

  const handleViewAllSession = () => {
    dispatch(setDrawerOpen(true));
    navigate("/patient-dashboard/therapy-chat");
  };

  const handleContinueActiveSession = () => {
    if (activeSessions.length > 0) {
      const latestActiveSession = [...activeSessions].sort(
        (a, b) => new Date(b.startTime) - new Date(a.startTime)
      )[0];

      dispatch(setActiveSession(latestActiveSession));
      dispatch(GetChatMessages(latestActiveSession.id));

      navigate("/patient-dashboard/therapy-chat");
    }
  };

  const handleTrackMood = (moodValue) => {
    setSelectedMoodValue(moodValue);
    setOpenMoodDialog(true);
  };

  const handleSaveMoodEntry = (formData) => {
    dispatch(CreateEmotionalState(formData))
      .unwrap()
      .then(() => {
        setOpenMoodDialog(false);
        showNotification(t("moodRecordWasSavedSuccessfully"), "success");
      })
      .catch((error) => {
        showNotification(error, "error");
      });
  };

  const features = [
    {
      title: t("newSession"),
      description: t("startNewConversation"),
      icon: "Psychology",
      color: theme.palette.primary.main,
      action: handleStartNewSession,
    },
    {
      title: t("viewSessions"),
      description: t("continueExistingConversation"),
      icon: "History",
      color: theme.palette.secondary.main,
      action: handleViewAllSession,
    },
    {
      title: t("dailyTips"),
      description: t("mentalHealthTips"),
      icon: "TipsAndUpdates",
      color: theme.palette.warning.main,
      action: () => navigate("/patient-dashboard/daily-tips"),
    },
    {
      title: t("moodTracker"),
      description: t("trackYourMood"),
      icon: "Mood",
      color: theme.palette.success.main,
      action: () => navigate("/patient-dashboard/mood-journal"),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <WelcomeHeader userName={patientFullName} />

      <FeatureGrid features={features} />

      <Grid container spacing={4}>
        {/* Sol Bölüm */}
        <Grid item xs={12} md={8}>
          {/* Oturum İstatistikleri */}
          <SessionStats
            totalSessions={totalAiSessions}
            completedSessions={completedSessions}
            activeSessions={activeSessions}
            navigate={navigate}
            onContinueSession={handleContinueActiveSession}
          />

          {/* Son Oturumlar */}
          <RecentSessions
            sessions={recentSessions}
            isLoading={isLoading}
            navigate={navigate}
            onViewAllSession={handleViewAllSession}
          />
        </Grid>

        {/* Sağ Bölüm */}
        <Grid item xs={12} md={4}>
          {/* Subscription Plans */}
          <SubscriptionPlans
            currentSubscription={currentSubscription}
            loading={subscriptionLoading}
          />

          {/* Duygu Durumu Takibi */}
          <MoodTracker
            onTrackMood={handleTrackMood}
            initialMoodValue={selectedMoodValue}
          />

          {/* Kaynaklar Listesi */}
          <ResourcesList />
        </Grid>
      </Grid>

      {openMoodDialog && (
        <MoodEntryDialog
          open={openMoodDialog}
          entry={null}
          onClose={() => setOpenMoodDialog(false)}
          onSave={handleSaveMoodEntry}
          moodLevels={MOOD_LEVELS}
          moodFactors={MOOD_FACTORS}
          getMoodColor={getMoodColor}
          getMoodLabel={getMoodLabel}
          moodVal={selectedMoodValue}
        />
      )}

      <NotificationSnackbar
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        severity={notification.severity}
      />
    </Container>
  );
};

export default PatientHome;
