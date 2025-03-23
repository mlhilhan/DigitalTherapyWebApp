import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Send,
  Psychology,
  Person,
  MoreVert,
  InfoOutlined,
  DeleteOutline,
  ContentCopy,
  EmojiEmotions,
  AttachFile,
  MicNone,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";
import LoadingComponent, {
  LOADING_TYPES,
} from "../../components/common/LoadingComponent";

// dummy data
const initialMessages = [
  {
    id: 1,
    sender: "assistant",
    text: "Merhaba! Ben Digital Terapi Asistanı. Bugün nasıl hissediyorsun?",
    timestamp: new Date(new Date().getTime() - 60000),
  },
];

// Öneri mesajlar
const suggestedMessages = [
  "Bugün kendimi biraz üzgün hissediyorum",
  "Anxiety yaşıyorum",
  "Uyku problemlerim var",
  "İş yerinde stres yaşıyorum",
];

const TherapyChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true); // Loading durumu
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMenuOpen = (event, messageId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMessageId(messageId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedMessageId(null);
  };

  const handleInfoOpen = (event) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    setIsTyping(true);
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        sender: "assistant",
        text: getAssistantResponse(newMessage),
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAssistantResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("üzgün") || lowerMessage.includes("mutsuz")) {
      return "Üzgün hissettiğini duyduğuma üzüldüm. Bu duyguyu tetikleyen belirli bir durum var mı?";
    }

    if (
      lowerMessage.includes("anxiety") ||
      lowerMessage.includes("kaygı") ||
      lowerMessage.includes("endişe")
    ) {
      return "Kaygı zor bir duygu olabilir. Derin nefes alıp verme gibi basit teknikler deneyebilirsin. Kaygını neyin tetiklediğini tanımlayabilir misin?";
    }

    if (lowerMessage.includes("uyku")) {
      return "Uyku problemleri yaşamak zor olabilir. Yatmadan önce ekran kullanımını azaltmak ve düzenli bir uyku rutini oluşturmak yardımcı olabilir. Uyku düzenin nasıl?";
    }

    if (lowerMessage.includes("stres") || lowerMessage.includes("iş")) {
      return "İş yerinde stres yaşamak oldukça yaygın. Kendine küçük molalar vermek ve önceliklerini belirlemek yardımcı olabilir. Stres seviyeni nasıl yönetiyorsun?";
    }

    // Default response
    return "Paylaştığın için teşekkür ederim. Bununla ilgili daha fazla şey anlatmak ister misin?";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp) => {
    return format(timestamp, "HH:mm", { locale: trLocale });
  };

  const handleSuggestedMessage = (message) => {
    setNewMessage(message);
  };

  const copyMessage = (id) => {
    const message = messages.find((m) => m.id === id);
    if (message) {
      navigator.clipboard.writeText(message.text);
    }
    handleMenuClose();
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
    handleMenuClose();
  };

  if (loading) {
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
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  width: 48,
                  height: 48,
                  mr: 2,
                }}
              >
                <Psychology fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {t("digitalTherapyAssistant")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    size="small"
                    color="success"
                    label={t("online")}
                    sx={{ mr: 1, height: 20 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {t("aiPowered")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <IconButton
              color="primary"
              onClick={handleInfoOpen}
              aria-label={t("info")}
            >
              <InfoOutlined />
            </IconButton>

            <Menu
              anchorEl={infoAnchorEl}
              open={Boolean(infoAnchorEl)}
              onClose={handleInfoClose}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  width: 280,
                  p: 1.5,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Typography variant="subtitle2" sx={{ px: 1, pb: 1 }}>
                {t("aboutDigitalTherapyAssistant")}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ px: 1, pb: 1 }}
              >
                {t("digitalAssistantDescription")}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ px: 1 }}
              >
                {t("aiDisclaimer")}
              </Typography>
            </Menu>
          </Box>
        </CardContent>
      </Card>

      {/* Message Suggestions */}
      <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {suggestedMessages.map((message, index) => (
          <Chip
            key={index}
            label={message}
            onClick={() => handleSuggestedMessage(message)}
            sx={{
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
              borderRadius: "16px",
              py: 0.5,
            }}
            clickable
          />
        ))}
      </Box>

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
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  message.sender === "user" ? "flex-end" : "flex-start",
                mb: 2,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  maxWidth: "70%",
                }}
              >
                {message.sender === "assistant" && (
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 36,
                      height: 36,
                      mr: 1,
                      mt: 0.5,
                    }}
                  >
                    <Psychology />
                  </Avatar>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      message.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 0.5,
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        ml: message.sender === "user" ? 0 : 0.5,
                      }}
                    >
                      {message.sender === "user"
                        ? user?.firstName || "Sen"
                        : "Asistan"}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", ml: 2 }}
                    >
                      {formatMessageTime(message.timestamp)}
                    </Typography>
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      pr: 3.5,
                      borderRadius: 2,
                      backgroundColor:
                        message.sender === "user"
                          ? "primary.main"
                          : "background.paper",
                      color:
                        message.sender === "user" ? "white" : "text.primary",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      position: "relative",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {message.text}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, message.id)}
                      sx={{
                        position: "absolute",
                        right: 5,
                        top: 5,
                        backgroundColor:
                          message.sender === "user"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(0, 0, 0, 0.05)",
                        color:
                          message.sender === "user"
                            ? "white"
                            : "text.secondary",
                        padding: "2px",
                        "&:hover": {
                          backgroundColor:
                            message.sender === "user"
                              ? "rgba(255, 255, 255, 0.25)"
                              : "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Paper>
                </Box>

                {message.sender === "user" && (
                  <Avatar
                    src={user?.avatarUrl}
                    sx={{
                      bgcolor: "grey.300",
                      width: 36,
                      height: 36,
                      ml: 1,
                      mt: 0.5,
                    }}
                  >
                    <Person />
                  </Avatar>
                )}
              </Box>
            </Box>
          ))}

          {/* Asistan yazıyor göstergesi */}
          {isTyping && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 36,
                  height: 36,
                  mr: 1,
                }}
              >
                <Psychology />
              </Avatar>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <CircularProgress size={10} />
                  <CircularProgress size={10} />
                  <CircularProgress size={10} />
                </Box>
              </Paper>
            </Box>
          )}

          {/* Scroll helper */}
          <div ref={messagesEndRef} />
        </Box>
      </Paper>

      {/* Message Input */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder={t("typeYourMessageHere")}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {!isMobile && (
                    <>
                      <IconButton color="primary" size="small">
                        <EmojiEmotions />
                      </IconButton>
                      <IconButton color="primary" size="small">
                        <AttachFile />
                      </IconButton>
                      <IconButton color="primary" size="small">
                        <MicNone />
                      </IconButton>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    </>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleSendMessage}
                    endIcon={<Send />}
                    disabled={!newMessage.trim()}
                  >
                    {t("send")}
                  </Button>
                </Box>
              </InputAdornment>
            ),
            sx: {
              p: 1,
              borderRadius: 2,
            },
          }}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Paper>

      {/* Message Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem onClick={() => copyMessage(selectedMessageId)}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("copy")} />
        </MenuItem>
        <MenuItem onClick={() => deleteMessage(selectedMessageId)}>
          <ListItemIcon>
            <DeleteOutline fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary={t("delete")} sx={{ color: "error.main" }} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TherapyChat;
