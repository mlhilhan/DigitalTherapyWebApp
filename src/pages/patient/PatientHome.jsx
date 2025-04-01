import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
  IconButton,
} from "@mui/material";
import {
  Psychology,
  CalendarToday,
  Message,
  SelfImprovement,
  ArrowForward,
  Add,
  History,
  Bolt,
  TipsAndUpdates,
  Bookmarks,
  Mood,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GetChatSessions } from "../../features/therapyChat/therapyChatSlice";

const PatientHome = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { sessions } = useSelector((state) => state.therapyChat);

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

  // Aktif oturumları filtrele
  const activeSessions = sessions?.filter((s) => s.isActive) || [];
  // Son 5 oturumu al
  const recentSessions = [...(sessions || [])]
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, 5);

  // Oturum istatistikleri
  const totalAiSessions = sessions?.length || 0;
  const completedSessions =
    sessions?.filter((s) => s.status === "Completed")?.length || 0;

  // Ana özellikler için kartlar
  const features = [
    {
      title: t("newSession"),
      description: t("startNewConversation"),
      icon: <Psychology />,
      color: theme.palette.primary.main,
      action: () => navigate("/therapy-chat"),
    },
    {
      title: t("viewSessions"),
      description: t("continueExistingConversation"),
      icon: <History />,
      color: theme.palette.secondary.main,
      action: () => navigate("/therapy-chat"),
    },
    {
      title: t("dailyTips"),
      description: t("mentalHealthTips"),
      icon: <TipsAndUpdates />,
      color: theme.palette.warning.main,
      action: () => {},
    },
    {
      title: t("moodTracker"),
      description: t("trackYourMood"),
      icon: <Mood />,
      color: theme.palette.success.main,
      action: () => {},
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Üst Bölüm - Karşılama Başlığı */}
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
          {t("welcomeBack")}, {user?.firstName || t("user")}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto", mb: 3 }}
        >
          {t("dashboardIntroText")}
        </Typography>
      </Box>

      {/* Ana Özellikler Kartları */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              onClick={feature.action}
              sx={{
                height: "100%",
                p: 2,
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: `1px solid ${alpha(feature.color, 0.2)}`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 10px 20px ${alpha(feature.color, 0.2)}`,
                  bgcolor: alpha(feature.color, 0.05),
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(feature.color, 0.1),
                    color: feature.color,
                    width: 56,
                    height: 56,
                    mb: 2,
                    "& .MuiSvgIcon-root": {
                      fontSize: 30,
                    },
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {feature.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: alpha(feature.color, 0.1),
                      color: feature.color,
                      "&:hover": {
                        bgcolor: alpha(feature.color, 0.2),
                      },
                    }}
                  >
                    <ArrowForward fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Sol Bölüm */}
        <Grid item xs={12} md={8}>
          {/* Oturum İstatistikleri */}
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
                label={`${totalAiSessions} ${t("totalSessions")}`}
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
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {completedSessions}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={
                      totalAiSessions > 0
                        ? (completedSessions / totalAiSessions) * 100
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
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="success.main"
                  >
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {t("noActiveSessions")}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Son Oturumlar */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid ${alpha("#000", 0.05)}`,
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${alpha("#000", 0.05)}`,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {t("recentSessions")}
              </Typography>
              <Button
                variant="text"
                color="primary"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/therapy-chat")}
                sx={{ textTransform: "none" }}
              >
                {t("viewAll")}
              </Button>
            </Box>

            {isLoading ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <LinearProgress sx={{ maxWidth: 300, mx: "auto" }} />
              </Box>
            ) : recentSessions.length > 0 ? (
              <List disablePadding>
                {recentSessions.map((session, index) => (
                  <React.Fragment key={session.id}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem
                      button
                      onClick={() => navigate("/therapy-chat")}
                      sx={{ py: 2 }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            bgcolor:
                              session.status === "Completed"
                                ? alpha(theme.palette.success.main, 0.1)
                                : alpha(theme.palette.primary.main, 0.1),
                            color:
                              session.status === "Completed"
                                ? "success.main"
                                : "primary.main",
                          }}
                        >
                          <Psychology />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="body1" fontWeight={500}>
                              {new Date(session.startTime).toLocaleDateString()}{" "}
                              {new Date(session.startTime).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </Typography>
                            {session.isActive && (
                              <Chip
                                label={t("active")}
                                color="primary"
                                size="small"
                                sx={{ ml: 1, height: 24, borderRadius: 3 }}
                              />
                            )}
                            {session.status === "Completed" && (
                              <Chip
                                label={t("completed")}
                                color="success"
                                size="small"
                                sx={{ ml: 1, height: 24, borderRadius: 3 }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            <Box
                              component="span"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <Message
                                fontSize="small"
                                sx={{ mr: 0.5, fontSize: 16 }}
                              />
                              {session.messageCount || 0} {t("messages")}
                            </Box>
                          </Typography>
                        }
                      />
                      <ArrowForward color="action" fontSize="small" />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {t("noSessionsYet")}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => navigate("/therapy-chat")}
                  sx={{ mt: 2, borderRadius: 6, textTransform: "none" }}
                >
                  {t("startFirstSession")}
                </Button>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Sağ Bölüm */}
        <Grid item xs={12} md={4}>
          {/* Günlük İpucu */}
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

          {/* Hızlı Durum Takibi */}
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

          {/* Kaynaklar */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: `1px solid ${alpha("#000", 0.05)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                {t("helpfulResources")}
              </Typography>

              <List disablePadding>
                {[
                  {
                    title: t("sleepTips"),
                    icon: <Bookmarks color="secondary" />,
                  },
                  {
                    title: t("anxietyManagement"),
                    icon: <SelfImprovement color="primary" />,
                  },
                  {
                    title: t("stressRelief"),
                    icon: <Psychology color="success" />,
                  },
                ].map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      mb: index < 2 ? 1 : 0,
                      bgcolor: alpha(theme.palette.background.default, 0.6),
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                    <ArrowForward color="action" fontSize="small" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientHome;
