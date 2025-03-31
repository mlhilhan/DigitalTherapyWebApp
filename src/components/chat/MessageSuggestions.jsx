import React from "react";
import { Box, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

// Öneri mesajlar
const suggestedMessages = [
  "Bugün kendimi biraz üzgün hissediyorum",
  "Anxiety yaşıyorum",
  "Uyku problemlerim var",
  "İş yerinde stres yaşıyorum",
];

const MessageSuggestions = ({ onSelectSuggestion }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
      {suggestedMessages.map((message, index) => (
        <Chip
          key={index}
          label={message}
          onClick={() => onSelectSuggestion(message)}
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
  );
};

export default MessageSuggestions;
