import React from "react";
import { Box, Paper, Avatar, keyframes } from "@mui/material";
import { Psychology } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

// Animasyon tanımı
const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.3; }
`;

const TypingIndicator = () => {
  const { t } = useTranslation();

  return (
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
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease-in-out",
        }}
        aria-label={t("aiName")}
      >
        <Psychology />
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          py: 1.5,
          borderRadius: "16px",
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
          }}
          aria-label={t("assistantTyping")}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                opacity: 0.6,
                animation: `${pulse} 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default TypingIndicator;
