import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  Divider,
  Fade,
  Tooltip,
  Zoom,
  Paper,
  Button,
} from "@mui/material";
import {
  Psychology,
  InfoOutlined,
  Help,
  PrivacyTip,
  ArrowBackIos,
  Settings,
} from "@mui/icons-material";
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
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
              border: "3px solid rgba(255, 255, 255, 0.8)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
              },
            }}
          >
            <Psychology fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {t("aiName")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip
                size="small"
                color="success"
                label={t("online")}
                sx={{
                  mr: 1,
                  height: 20,
                  "& .MuiChip-label": {
                    px: 1,
                    fontWeight: 500,
                  },
                  animation: "pulse 2s infinite ease-in-out",
                  "@keyframes pulse": {
                    "0%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.4)" },
                    "70%": { boxShadow: "0 0 0 6px rgba(76, 175, 80, 0)" },
                    "100%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0)" },
                  },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {t("aiPowered")}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Tooltip
          title={t("aboutAssistant")}
          placement="bottom"
          arrow
          TransitionComponent={Zoom}
        >
          <IconButton
            color="primary"
            onClick={handleInfoOpen}
            aria-label={t("info")}
            sx={{
              bgcolor: "rgba(25, 118, 210, 0.08)",
              "&:hover": {
                bgcolor: "rgba(25, 118, 210, 0.14)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <InfoOutlined />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={infoAnchorEl}
          open={Boolean(infoAnchorEl)}
          onClose={handleInfoClose}
          TransitionComponent={Fade}
          PaperProps={{
            component: Paper,
            elevation: 3,
            sx: {
              borderRadius: 3,
              width: 320,
              p: 2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              overflow: "hidden",
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                color: "white",
                width: 40,
                height: 40,
                mr: 2,
              }}
            >
              <Psychology />
            </Avatar>
            <Typography variant="h6" fontWeight={600}>
              {t("digitalTherapyAssistant")}
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {t("aboutDigitalTherapyAssistant")}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            {t("digitalAssistantDescription")}
          </Typography>

          <Box sx={{ display: "flex", mb: 2 }}>
            <Button
              startIcon={<Help />}
              variant="outlined"
              size="small"
              sx={{ mr: 1, borderRadius: 2, textTransform: "none" }}
            >
              {t("howToUse")}
            </Button>
            <Button
              startIcon={<PrivacyTip />}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              {t("privacy")}
            </Button>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", fontStyle: "italic" }}
          >
            {t("aiDisclaimer")}
          </Typography>

          <Button
            fullWidth
            variant="text"
            color="inherit"
            size="small"
            startIcon={<Settings fontSize="small" />}
            sx={{
              mt: 2,
              justifyContent: "flex-start",
              color: "text.secondary",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {t("preferences")}
          </Button>

          <Button
            fullWidth
            variant="text"
            color="inherit"
            size="small"
            startIcon={<ArrowBackIos fontSize="small" sx={{ fontSize: 14 }} />}
            sx={{
              justifyContent: "flex-start",
              color: "text.secondary",
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={handleInfoClose}
          >
            {t("back")}
          </Button>
        </Menu>
      </Box>
    </>
  );
};

export default ChatHeader;
