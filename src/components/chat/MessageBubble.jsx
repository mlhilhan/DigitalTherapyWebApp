import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Psychology, Person, MoreVert } from "@mui/icons-material";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";
import { useTranslation } from "react-i18next";

const MessageBubble = ({
  message,
  user,
  onMenuOpen,
  isFirstInSequence = true,
  isLastInSequence = true,
}) => {
  const { t } = useTranslation();
  const isUserMessage = !message.isAiGenerated;

  const senderName = isUserMessage
    ? user?.firstName || t("you")
    : t("assistant");

  const formatMessageTime = (timestamp) => {
    return format(new Date(timestamp || Date.now()), "HH:mm", {
      locale: trLocale,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUserMessage ? "flex-end" : "flex-start",
        mb: isLastInSequence ? 2 : 0.5,
        mt: isFirstInSequence ? 2 : 0.5,
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          justifyContent: isUserMessage ? "flex-end" : "flex-start",
        }}
      >
        {!isUserMessage && isFirstInSequence && (
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 36,
              height: 36,
              mr: 1,
              mt: 0.5,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              border: "2px solid #fff",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transform: "scale(1.05)",
              },
            }}
          >
            <Psychology />
          </Avatar>
        )}

        {!isUserMessage && !isFirstInSequence && (
          <Box sx={{ width: 36, mr: 1, flexShrink: 0 }} />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isUserMessage ? "flex-end" : "flex-start",
            maxWidth: "85%",
            minWidth: isUserMessage ? 120 : "auto",
            flexGrow: 0,
          }}
        >
          {isFirstInSequence && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isUserMessage ? "flex-end" : "flex-start",
                mb: 0.5,
                width: "100%",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  ml: isUserMessage ? 0 : 0.5,
                }}
              >
                {senderName}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", ml: 2, opacity: 0.8 }}
              >
                {formatMessageTime(message.sentAt || message.timestamp)}
              </Typography>
            </Box>
          )}

          <Paper
            elevation={0}
            sx={{
              p: 2,
              pr: 3.5,
              borderRadius: ({ direction }) => ({
                topLeft: isUserMessage ? 16 : isFirstInSequence ? 16 : 4,
                topRight: isUserMessage ? (isFirstInSequence ? 16 : 4) : 16,
                bottomLeft: isUserMessage ? 16 : isLastInSequence ? 16 : 4,
                bottomRight: isUserMessage ? (isLastInSequence ? 16 : 4) : 16,
              }),
              backgroundColor: isUserMessage
                ? "primary.main"
                : "background.paper",
              color: isUserMessage ? "white" : "text.primary",
              boxShadow: isUserMessage
                ? "0 2px 12px rgba(25, 118, 210, 0.2)"
                : "0 2px 8px rgba(0,0,0,0.06)",
              position: "relative",
              border: isUserMessage ? "none" : "1px solid rgba(0,0,0,0.04)",
              minWidth: isUserMessage ? 120 : "auto",
              width: "auto",
              display: "inline-block",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {message.content || message.text}
            </Typography>

            <Tooltip
              title={t("messageOptions")}
              placement={isUserMessage ? "left" : "right"}
              arrow
              TransitionComponent={Zoom}
            >
              <IconButton
                size="small"
                onClick={(e) => onMenuOpen(e, message.id)}
                sx={{
                  position: "absolute",
                  right: 5,
                  top: 5,
                  backgroundColor: isUserMessage
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.05)",
                  color: isUserMessage ? "white" : "text.secondary",
                  padding: "2px",
                  opacity: 0.7,
                  "&:hover": {
                    backgroundColor: isUserMessage
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(0, 0, 0, 0.1)",
                    opacity: 1,
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>

        {isUserMessage && isFirstInSequence && (
          <Avatar
            src={user?.avatarUrl}
            sx={{
              bgcolor: "grey.300",
              width: 36,
              height: 36,
              ml: 1,
              mt: 0.5,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              border: "2px solid #fff",
              transition: "all 0.2s ease",
              flexShrink: 0,
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transform: "scale(1.05)",
              },
            }}
          >
            <Person />
          </Avatar>
        )}

        {isUserMessage && !isFirstInSequence && (
          <Box sx={{ width: 36, ml: 1, flexShrink: 0 }} />
        )}
      </Box>
    </Box>
  );
};

export default MessageBubble;
