import React from "react";
import {
  Card,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Button,
  LinearProgress,
  Chip,
  IconButton,
  alpha,
} from "@mui/material";
import { Psychology, Message, ArrowForward, Add } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const RecentSessions = ({
  sessions,
  isLoading,
  navigate,
  onViewAllSession,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${alpha("#000", 0.05)}`,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${alpha("#000", 0.05)}`,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {t("recentSessions")}
        </Typography>
        <Button
          variant="text"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={onViewAllSession}
          sx={{ textTransform: "none" }}
        >
          {t("viewAll")}
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <LinearProgress sx={{ maxWidth: 300, mx: "auto" }} />
        </Box>
      ) : sessions.length > 0 ? (
        <List disablePadding>
          {sessions.map((session, index) => (
            <React.Fragment key={session.id}>
              {index > 0 && <Divider component="li" />}
              <ListItem
                button
                onClick={() => navigate("/therapy-chat")}
                sx={{ py: 2 }}
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      bgcolor:
                        session.status === "Completed"
                          ? alpha(theme.palette.success.main, 0.1)
                          : alpha(theme.palette.primary.main, 0.1),
                      color:
                        session.status === "Completed"
                          ? "success.main"
                          : "primary.main",
                    }}
                  >
                    <Psychology />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1" fontWeight={500}>
                        {new Date(session.startTime).toLocaleDateString()}{" "}
                        {new Date(session.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      {session.isActive && (
                        <Chip
                          label={t("active")}
                          color="primary"
                          size="small"
                          sx={{ ml: 1, height: 24, borderRadius: 3 }}
                        />
                      )}
                      {session.status === "Completed" && (
                        <Chip
                          label={t("completed")}
                          color="success"
                          size="small"
                          sx={{ ml: 1, height: 24, borderRadius: 3 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      <Box
                        component="span"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                      >
                        <Message
                          fontSize="small"
                          sx={{ mr: 0.5, fontSize: 16 }}
                        />
                        {session.messageCount || 0} {t("messages")}
                      </Box>
                    </Typography>
                  }
                />
                <ArrowForward color="action" fontSize="small" />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {t("noSessionsYet")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate("/therapy-chat")}
            sx={{ mt: 2, borderRadius: 6, textTransform: "none" }}
          >
            {t("startFirstSession")}
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default RecentSessions;
