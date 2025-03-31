import React from "react";
import { Box, Chip, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";

// Öneri mesajlar - bu mesajları terapi odaklı olarak güncelledim
const suggestedMessages = [
  "Bugün kendimi biraz üzgün hissediyorum",
  "Anxiety yaşıyorum",
  "Uyku problemlerim var",
  "İş yerinde stres yaşıyorum",
];

const MessageSuggestions = ({ onSelectSuggestion }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1.2 }}>
      {suggestedMessages.map((message, index) => (
        <Fade
          in={true}
          key={index}
          timeout={500}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <Chip
            label={t(message)}
            onClick={() => onSelectSuggestion(message)}
            sx={{
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "primary.lighter",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transform: "translateY(-2px)",
              },
              borderRadius: "18px",
              py: 0.7,
              px: 0.5,
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              transition: "all 0.2s ease-in-out",
              fontWeight: 500,
            }}
            clickable
          />
        </Fade>
      ))}
    </Box>
  );
};

export default MessageSuggestions;
