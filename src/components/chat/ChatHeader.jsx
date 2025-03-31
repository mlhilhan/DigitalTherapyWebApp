import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  Divider,
} from "@mui/material";
import { Psychology, InfoOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const ChatHeader = () => {
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const { t } = useTranslation();

  const handleInfoOpen = (event) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  return (
    <>
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
          <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
            {t("aiDisclaimer")}
          </Typography>
        </Menu>
      </Box>
    </>
  );
};

export default ChatHeader;
