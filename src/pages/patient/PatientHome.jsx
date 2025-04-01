import React, { useState, useEffect } from "react";
import { Container, Grid, Box, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GetChatSessions } from "../../features/therapyChat/therapyChatSlice";
import WelcomeHeader from "../../components/patientHome/WelcomeHeader";
import FeatureGrid from "../../components/patientHome/FeatureGrid";
import SessionStats from "../../components/patientHome/SessionStats";
import RecentSessions from "../../components/patientHome/RecentSessions";
import DailyTip from "../../components/patientHome/DailyTip";
import MoodTracker from "../../components/patientHome/MoodTracker";
import ResourcesList from "../../components/patientHome/ResourcesList";

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

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(GetChatSessions()).unwrap();
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

  const activeSessions = sessions?.filter((s) => s.isActive) || [];
  const recentSessions = [...(sessions || [])]
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, 5);
  const totalAiSessions = sessions?.length || 0;
  const completedSessions =
    sessions?.filter((s) => s.status === "Completed")?.length || 0;

  const features = [
    {
      title: t("newSession"),
      description: t("startNewConversation"),
      icon: "Psychology",
      color: theme.palette.primary.main,
      action: () => navigate("/patient-dashboard/therapy-chat"),
    },
    {
      title: t("viewSessions"),
      description: t("continueExistingConversation"),
      icon: "History",
      color: theme.palette.secondary.main,
      action: () => navigate("/patient-dashboard/therapy-chat"),
    },
    {
      title: t("dailyTips"),
      description: t("mentalHealthTips"),
      icon: "TipsAndUpdates",
      color: theme.palette.warning.main,
      action: () => {},
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
          />

          {/* Son Oturumlar */}
          <RecentSessions
            sessions={recentSessions}
            isLoading={isLoading}
            navigate={navigate}
          />
        </Grid>

        {/* Sağ Bölüm */}
        <Grid item xs={12} md={4}>
          {/* Günlük İpucu */}
          <DailyTip />

          {/* Duygu Durumu Takibi */}
          <MoodTracker />

          {/* Kaynaklar Listesi */}
          <ResourcesList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientHome;
