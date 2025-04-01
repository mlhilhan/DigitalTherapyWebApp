import React, { useState } from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Divider,
  Button,
  Tooltip,
  Zoom,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Send,
  EmojiEmotions,
  AttachFile,
  MicNone,
  Psychology,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MessageInput = ({ message, setMessage, handleSendMessage, disabled }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isFocused, setIsFocused] = useState(false);
  const { activeSession } = useSelector((state) => state.therapyChat);
  const isSessionCompleted = activeSession?.status === "Completed";

  const isInputDisabled = disabled || isSessionCompleted;

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isInputDisabled) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.04)",
        transition: "all 0.3s ease",
        transform: isFocused ? "translateY(-4px)" : "translateY(0)",
        opacity: isSessionCompleted ? 0.8 : 1,
      }}
    >
      {isSessionCompleted && (
        <Box
          sx={{
            p: 1.5,
            mb: 2,
            borderRadius: 2,
            backgroundColor: (theme) => theme.palette.success.light + "10",
            border: "1px solid",
            borderColor: (theme) => theme.palette.success.light + "30",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Psychology
            sx={{
              color: "success.main",
              mr: 1,
              fontSize: 20,
            }}
          />
          <Box
            component="span"
            sx={{ color: "success.main", fontSize: "0.875rem" }}
          >
            {t("sessionCompletedNoMoreMessages")}
          </Box>
        </Box>
      )}

      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder={
          isSessionCompleted
            ? t("sessionCompletedNoMoreMessages")
            : t("typeYourMessageHere")
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isInputDisabled}
        InputProps={{
          startAdornment: !isMobile && (
            <InputAdornment position="start">
              <Tooltip
                title={t("aiAssistant")}
                placement="top"
                arrow
                TransitionComponent={Zoom}
              >
                <Psychology color="primary" sx={{ mx: 1, opacity: 0.7 }} />
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!isMobile && (
                  <>
                    <Tooltip
                      title={t("addEmoji")}
                      arrow
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        color="primary"
                        size="small"
                        disabled={isInputDisabled}
                        sx={{
                          mx: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(25, 118, 210, 0.08)",
                          },
                        }}
                      >
                        <EmojiEmotions fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title={t("attachFile")}
                      arrow
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        color="primary"
                        size="small"
                        disabled={isInputDisabled}
                        sx={{
                          mx: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(25, 118, 210, 0.08)",
                          },
                        }}
                      >
                        <AttachFile fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title={t("voiceInput")}
                      arrow
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        color="primary"
                        size="small"
                        disabled={isInputDisabled}
                        sx={{
                          mx: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(25, 118, 210, 0.08)",
                          },
                        }}
                      >
                        <MicNone fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={handleSendMessage}
                  disabled={isInputDisabled || !message.trim()}
                  endIcon={disabled ? <CircularProgress size={16} /> : <Send />}
                  sx={{
                    borderRadius: "12px",
                    px: 2,
                    py: 1,
                    textTransform: "none",
                    boxShadow:
                      message.trim() && !isInputDisabled
                        ? "0 4px 10px rgba(25, 118, 210, 0.2)"
                        : "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 12px rgba(25, 118, 210, 0.3)",
                    },
                  }}
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
            backgroundColor: isSessionCompleted ? "#F5F5F5" : "#FAFAFA",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
            "&.Mui-focused": {
              backgroundColor: "#F5F5F5",
            },
            "&.Mui-disabled": {
              backgroundColor: "#F0F0F0",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isSessionCompleted
              ? "rgba(0, 0, 0, 0.15)"
              : "rgba(0, 0, 0, 0.08)",
          },
        }}
      />
    </Paper>
  );
};

export default MessageInput;
