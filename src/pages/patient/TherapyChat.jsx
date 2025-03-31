import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Card,
  Snackbar,
  Alert,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Badge,
  CircularProgress,
  Fade,
  useTheme,
  Button,
  Collapse,
  Grow,
  Tooltip,
  Zoom,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  History,
  Add,
  Close,
  ClearAll,
  FormatQuote,
  RestartAlt,
} from "@mui/icons-material";
import ChatHeader from "../../components/chat/ChatHeader";
import MessageSuggestions from "../../components/chat/MessageSuggestions";
import MessageBubble from "../../components/chat/MessageBubble";
import TypingIndicator from "../../components/chat/TypingIndicator";
import MessageInput from "../../components/chat/MessageInput";
import MessageMenu from "../../components/chat/MessageMenu";
import LoadingComponent, {
  LOADING_TYPES,
} from "../../components/common/LoadingComponent";
import {
  StartChatSession,
  SendChatMessage,
  GetChatMessages,
  GetChatSessions,
  addLocalMessage,
  clearChatError,
  setActiveSession,
  clearMessages,
} from "../../features/therapyChat/therapyChatSlice";

const TherapyChat = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const {
    activeSession,
    currentMessages,
    sessions,
    loading,
    sending,
    loadingMessages,
    error,
  } = useSelector((state) => state.therapyChat);

  useEffect(() => {
    dispatch(GetChatSessions());
  }, [dispatch]);

  // Initial loading and session setup
  useEffect(() => {
    const initChat = async () => {
      try {
        await dispatch(GetChatSessions()).unwrap();
        if (!activeSession) {
          await dispatch(StartChatSession()).unwrap();
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      } finally {
        setTimeout(() => {
          setLocalLoading(false);
        }, 800);
      }
    };

    initChat();
  }, [dispatch, activeSession]);

  useEffect(() => {
    if (activeSession?.id) {
      dispatch(GetChatMessages(activeSession.id));
    }
  }, [dispatch, activeSession]);

  // Hide welcome message when messages exist
  useEffect(() => {
    if (currentMessages.length > 0) {
      setShowWelcomeMessage(false);
    } else {
      setShowWelcomeMessage(true);
    }
  }, [currentMessages]);

  // Handle error display
  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !activeSession) return;

    // Optimistic user message for UI
    const userMessage = {
      id: `temp-${new Date().getTime()}`,
      isAiGenerated: false,
      content: newMessage,
      sentAt: new Date(),
      sessionId: activeSession.id,
    };

    dispatch(addLocalMessage(userMessage));
    setNewMessage("");
    setShowWelcomeMessage(false);

    setIsTyping(true);

    try {
      const result = await dispatch(
        SendChatMessage({
          message: newMessage,
          sessionId: activeSession?.id,
        })
      ).unwrap();

      const respondedSessionId = result?.data?.sessionId;

      await dispatch(GetChatMessages(activeSession.id)).unwrap();

      if (result?.data?.sessionActivated) {
        await dispatch(GetChatSessions()).unwrap();

        if (drawerOpen) {
          setDrawerOpen(false);
          setTimeout(() => setDrawerOpen(true), 10);
        }
      }

      setIsTyping(false);
    } catch (error) {
      setErrorMessage(error.message || t("anErrorOccurred"));
      setErrorOpen(true);
      setIsTyping(false);
    }
  };

  const handleMenuOpen = (event, messageId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMessageId(messageId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedMessageId(null);
  };

  const handleSuggestedMessage = (message) => {
    setNewMessage(message);
  };

  const copyMessage = () => {
    const message = currentMessages.find((m) => m.id === selectedMessageId);
    if (message) {
      navigator.clipboard.writeText(message.content || message.text);
    }
    handleMenuClose();
  };

  const deleteMessage = () => {
    // Delete message logic here
    handleMenuClose();
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
    setErrorMessage("");
    dispatch(clearChatError());
  };

  const startNewSession = async () => {
    try {
      dispatch(clearMessages());
      dispatch(setActiveSession(null));
      await dispatch(StartChatSession(true)).unwrap();
      await dispatch(GetChatSessions()).unwrap();
      setShowWelcomeMessage(true);
      setDrawerOpen(false);
    } catch (error) {
      setErrorMessage(error.message || t("anErrorOccurred"));
      setErrorOpen(true);
    }
  };

  const uniqueSessions = sessions.filter(
    (session, index, self) =>
      index === self.findIndex((s) => s.id === session.id)
  );

  // Ardından bu benzersiz oturumları kullanarak gruplama yapın
  const sessionDates = uniqueSessions
    ? [
        ...new Set(
          uniqueSessions.map((session) =>
            new Date(session.startTime).toLocaleDateString("tr-TR")
          )
        ),
      ].sort((a, b) => new Date(b) - new Date(a))
    : [];

  // Grupları oluşturun
  const groupedSessions = sessionDates.map((date) => ({
    date,
    sessions: uniqueSessions.filter(
      (session) =>
        new Date(session.startTime).toLocaleDateString("tr-TR") === date
    ),
  }));

  // // Get distinct dates from sessions for grouping
  // const sessionDates = sessions
  //   ? [
  //       ...new Set(
  //         sessions.map((session) =>
  //           new Date(session.startTime).toLocaleDateString("tr-TR")
  //         )
  //       ),
  //     ].sort((a, b) => new Date(b) - new Date(a))
  //   : [];

  // // Group sessions by date
  // const groupedSessions = sessionDates.map((date) => ({
  //   date,
  //   sessions: sessions.filter(
  //     (session) =>
  //       new Date(session.startTime).toLocaleDateString("tr-TR") === date
  //   ),
  // }));

  // Show loading while chat initializes
  if (localLoading || loading) {
    return <LoadingComponent type={LOADING_TYPES.CHAT} />;
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8FAFC",
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
      }}
    >
      {/* Chat Header */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 0,
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ChatHeader />
            <Tooltip
              title={t("sessionHistory")}
              placement="bottom"
              arrow
              TransitionComponent={Zoom}
            >
              <IconButton
                color="primary"
                onClick={() => setDrawerOpen(true)}
                aria-label={t("sessionHistory")}
                sx={{
                  bgcolor: "rgba(25, 118, 210, 0.08)",
                  "&:hover": {
                    bgcolor: "rgba(25, 118, 210, 0.14)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Badge badgeContent={sessions?.length || 0} color="primary">
                  <History />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>

      {/* Message Suggestions */}
      <Collapse in={showWelcomeMessage && currentMessages.length === 0}>
        <Box sx={{ px: 2, pt: 2 }}>
          <MessageSuggestions onSelectSuggestion={handleSuggestedMessage} />
        </Box>
      </Collapse>

      {/* Chat Messages */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          px: 2,
          py: 1.5,
          mx: 2,
          mb: 2,
          borderRadius: 3,
          backgroundColor: "#fff",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          border: "1px solid rgba(0,0,0,0.05)",
          scrollBehavior: "smooth",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {loadingMessages && currentMessages.length === 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <TypingIndicator />
            </Box>
          )}

          {currentMessages.length === 0 && !loadingMessages && (
            <Fade in={true} timeout={800}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexDirection: "column",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(25, 118, 210, 0.05)",
                    p: 3,
                    borderRadius: 4,
                    mb: 2,
                    maxWidth: "85%",
                    border: "1px dashed rgba(25, 118, 210, 0.3)",
                  }}
                >
                  <FormatQuote
                    color="primary"
                    sx={{
                      fontSize: 40,
                      opacity: 0.6,
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ mb: 2, fontWeight: 500 }}
                  >
                    {t("welcomeToTherapy")}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {t("therapyGreeting")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("therapyInstructions")}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<RestartAlt />}
                    onClick={startNewSession}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      px: 2,
                    }}
                  >
                    {t("startNewSession")}
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}

          {/* Display messages in chronological order */}
          {currentMessages.map((message, index) => (
            <Grow
              in={true}
              key={message.id}
              timeout={300}
              style={{
                transformOrigin: message.isAiGenerated ? "0 0 0" : "100% 0 0",
              }}
            >
              <Box>
                <MessageBubble
                  message={message}
                  user={user}
                  onMenuOpen={handleMenuOpen}
                  isFirstInSequence={
                    index === 0 ||
                    currentMessages[index - 1].isAiGenerated !==
                      message.isAiGenerated
                  }
                  isLastInSequence={
                    index === currentMessages.length - 1 ||
                    currentMessages[index + 1].isAiGenerated !==
                      message.isAiGenerated
                  }
                />
              </Box>
            </Grow>
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          {/* Scroll helper */}
          <div ref={messagesEndRef} />
        </Box>
      </Paper>

      {/* Message Input */}
      <Box sx={{ px: 2, pb: 2 }}>
        <MessageInput
          message={newMessage}
          setMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          disabled={sending || !activeSession}
        />
      </Box>

      {/* Message Menu */}
      <MessageMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        handleClose={handleMenuClose}
        handleCopy={copyMessage}
        handleDelete={deleteMessage}
      />

      {/* Error snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{
            width: "100%",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: 2,
          }}
        >
          {errorMessage || error || t("anErrorOccurred")}
        </Alert>
      </Snackbar>

      {/* Sessions Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "85%", sm: 360 },
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
            top: "64px",
            height: "calc(100% - 64px)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {t("sessions")}
            </Typography>
            <Box>
              <Tooltip
                title={t("newSession")}
                placement="left"
                arrow
                TransitionComponent={Zoom}
              >
                <IconButton
                  color="primary"
                  onClick={startNewSession}
                  sx={{
                    mr: 1,
                    bgcolor: "rgba(25, 118, 210, 0.08)",
                    "&:hover": {
                      bgcolor: "rgba(25, 118, 210, 0.14)",
                    },
                  }}
                >
                  <Add />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={t("close")}
                placement="left"
                arrow
                TransitionComponent={Zoom}
              >
                <IconButton
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress size={30} />
            </Box>
          ) : sessions && sessions.length > 0 ? (
            <Box>
              {groupedSessions.map((group) => (
                <Box key={group.date} sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      px: 1,
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    {group.date}
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <List disablePadding>
                      {group.sessions.map((session, index) => (
                        <React.Fragment key={session.id}>
                          {index > 0 && <Divider />}
                          <ListItem disablePadding>
                            <ListItemButton
                              selected={activeSession?.id === session.id}
                              onClick={() => {
                                dispatch(setActiveSession(session));
                                dispatch(GetChatMessages(session.id));
                                setDrawerOpen(false);
                              }}
                              sx={{
                                py: 1.5,
                                borderLeft:
                                  activeSession?.id === session.id
                                    ? `4px solid ${theme.palette.primary.main}`
                                    : "4px solid transparent",
                                bgcolor:
                                  activeSession?.id === session.id
                                    ? "rgba(25, 118, 210, 0.08)"
                                    : "transparent",
                                "&:hover": {
                                  bgcolor:
                                    activeSession?.id === session.id
                                      ? "rgba(25, 118, 210, 0.12)"
                                      : "rgba(0, 0, 0, 0.04)",
                                },
                              }}
                            >
                              <ListItemText
                                primary={
                                  <Typography variant="body2" fontWeight={500}>
                                    {new Date(
                                      session.startTime
                                    ).toLocaleTimeString("tr-TR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                    {session.isActive && (
                                      <Chip
                                        label={t("active")}
                                        size="small"
                                        color="primary"
                                        sx={{
                                          ml: 1,
                                          height: 18,
                                          "& .MuiChip-label": {
                                            px: 0.8,
                                            py: 0,
                                          },
                                        }}
                                      />
                                    )}
                                  </Typography>
                                }
                                secondary={
                                  <>
                                    <Typography
                                      variant="body2"
                                      noWrap
                                      color="text.secondary"
                                      sx={{
                                        maxWidth: "100%",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {session.lastMessage || t("noMessages")}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mt: 0.5,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mr: 1,
                                        }}
                                      >
                                        <FormatQuote
                                          fontSize="small"
                                          sx={{ fontSize: 16, mr: 0.5 }}
                                        />
                                        <Typography
                                          variant="caption"
                                          fontWeight={500}
                                        >
                                          {session.messageCount || 0}
                                        </Typography>
                                      </Box>
                                      {t("messages")}
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: "rgba(0, 0, 0, 0.02)",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t("noSessionsYet")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={startNewSession}
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                {t("startFirstSession")}
              </Button>
            </Box>
          )}

          {sessions && sessions.length > 0 && (
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 2,
                textTransform: "none",
                color: "text.secondary",
                borderColor: "rgba(0, 0, 0, 0.12)",
              }}
              startIcon={<ClearAll />}
            >
              {t("clearAllSessions")}
            </Button>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default TherapyChat;
