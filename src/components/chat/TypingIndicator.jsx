import React from "react";
import { Box, Paper, Avatar, CircularProgress } from "@mui/material";
import { Psychology } from "@mui/icons-material";

const TypingIndicator = () => {
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
  );
};

export default TypingIndicator;
