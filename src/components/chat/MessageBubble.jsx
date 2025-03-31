import React from "react";
import { Box, Typography, Paper, Avatar, IconButton } from "@mui/material";
import { Psychology, Person, MoreVert } from "@mui/icons-material";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";

const MessageBubble = ({ message, user, onMenuOpen }) => {
  const isUserMessage = !message.isAiGenerated;

  const senderName = isUserMessage ? user?.firstName || "Sen" : "Asistan";

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
        {!isUserMessage && (
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
            alignItems: isUserMessage ? "flex-end" : "flex-start",
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
                ml: isUserMessage ? 0 : 0.5,
              }}
            >
              {senderName}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", ml: 2 }}
            >
              {formatMessageTime(message.sentAt || message.timestamp)}
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              pr: 3.5,
              borderRadius: 2,
              backgroundColor: isUserMessage
                ? "primary.main"
                : "background.paper",
              color: isUserMessage ? "white" : "text.primary",
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
              {message.content || message.text}
            </Typography>

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
                "&:hover": {
                  backgroundColor: isUserMessage
                    ? "rgba(255, 255, 255, 0.25)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Paper>
        </Box>

        {isUserMessage && (
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
  );
};

export default MessageBubble;
