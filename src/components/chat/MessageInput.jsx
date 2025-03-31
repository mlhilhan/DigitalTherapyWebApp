import React from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Send, EmojiEmotions, AttachFile, MicNone } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const MessageInput = ({ message, setMessage, handleSendMessage, disabled }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!isMobile && (
                  <>
                    <IconButton
                      color="primary"
                      size="small"
                      disabled={disabled}
                    >
                      <EmojiEmotions />
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      disabled={disabled}
                    >
                      <AttachFile />
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      disabled={disabled}
                    >
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
                  disabled={disabled || !message.trim()}
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
  );
};

export default MessageInput;
