import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import { History, Add } from "@mui/icons-material";

const TherapyChat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
        }, 1000);
      }
    };

    initChat();
  }, [dispatch, activeSession]);

  useEffect(() => {
    if (activeSession?.id) {
      dispatch(GetChatMessages(activeSession.id));
    }
  }, [dispatch, activeSession]);

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

    // Aktif oturum ID'sini log'la
    console.log("Sending message to session:", activeSession.id);

    // Optimistik olarak kullanıcı mesajını UI'a ekle
    const userMessage = {
      id: `temp-${new Date().getTime()}`,
      isAiGenerated: false,
      content: newMessage,
      sentAt: new Date(),
      sessionId: activeSession.id, // Oturum ID'sini ekle
    };

    dispatch(addLocalMessage(userMessage));
    setNewMessage("");

    // Typing indicator'ı göster
    setIsTyping(true);

    try {
      await dispatch(
        SendChatMessage({
          message: newMessage,
          sessionId: activeSession?.id,
        })
      ).unwrap();

      // Güncel mesajları getir
      await dispatch(GetChatMessages(activeSession.id)).unwrap();
      setIsTyping(false);
    } catch (error) {
      console.error("Failed to send message:", error);
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
    handleMenuClose();
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
    dispatch(clearChatError());
  };

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
      }}
    >
      {/* Chat Header */}
      <Card
        elevation={2}
        sx={{
          mb: 2,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ChatHeader />
            <IconButton
              color="primary"
              onClick={() => setDrawerOpen(true)}
              aria-label="Geçmiş Oturumlar"
            >
              <Badge badgeContent={sessions?.length} color="primary">
                <History />
              </Badge>
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Message Suggestions */}
      <MessageSuggestions onSelectSuggestion={handleSuggestedMessage} />

      {/* Chat Messages */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          p: 2,
          mb: 2,
          borderRadius: 2,
          backgroundColor: "rgb(249, 250, 251)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {loadingMessages && currentMessages.length === 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <TypingIndicator />
            </Box>
          )}

          {/* Mesajları tarih sırasına göre göster (eskiden yeniye) */}
          {currentMessages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              user={user}
              onMenuOpen={handleMenuOpen}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          {/* Scroll helper */}
          <div ref={messagesEndRef} />
        </Box>
      </Paper>

      {/* Message Input */}
      <MessageInput
        message={newMessage}
        setMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        disabled={sending || !activeSession}
      />

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
          sx={{ width: "100%" }}
        >
          {error || t("anErrorOccurred")}
        </Alert>
      </Snackbar>

      {/** Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            top: "64px",
          },
        }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Terapi Oturumları</Typography>
            <IconButton
              color="primary"
              onClick={async () => {
                try {
                  console.log(
                    "New session button clicked, forcing new session"
                  );
                  dispatch(clearMessages());
                  dispatch(setActiveSession(null));
                  await dispatch(StartChatSession(true)).unwrap();
                  await dispatch(GetChatSessions()).unwrap();
                  setDrawerOpen(false);
                } catch (error) {
                  console.error("Error starting new session:", error);
                  setErrorOpen(true);
                }
              }}
            >
              <Add />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress size={30} />
            </Box>
          ) : sessions && sessions.length > 0 ? (
            <List>
              {sessions.map((session) => (
                <ListItem key={session.id} disablePadding>
                  <ListItemButton
                    selected={activeSession?.id === session.id}
                    onClick={() => {
                      dispatch(setActiveSession(session));
                      dispatch(GetChatMessages(session.id));
                      setDrawerOpen(false);
                    }}
                  >
                    <ListItemText
                      primary={`Oturum: ${new Date(
                        session.startTime
                      ).toLocaleDateString()}`}
                      secondary={
                        <>
                          <Typography variant="body2" noWrap>
                            {session.lastMessage || "Henüz mesaj yok"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Mesaj: {session.messageCount || 0}
                            {session.isActive && " • Aktif"}
                          </Typography>
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 2, textAlign: "center" }}
            >
              Henüz hiç terapi oturumu bulunmuyor.
            </Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default TherapyChat;
