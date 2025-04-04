import React from "react";
import {
  Snackbar,
  Box,
  Typography,
  Slide,
  IconButton,
  alpha,
} from "@mui/material";
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmberOutlined,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const NotificationSnackbar = ({
  open,
  onClose,
  message,
  severity = "info",
}) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (severity) {
      case "success":
        return <CheckCircleOutline fontSize="medium" />;
      case "error":
        return <ErrorOutline fontSize="medium" />;
      case "warning":
        return <WarningAmberOutlined fontSize="medium" />;
      case "info":
      default:
        return <InfoOutlined fontSize="medium" />;
    }
  };

  const getStyles = () => {
    switch (severity) {
      case "success":
        return {
          color: theme.palette.success.main,
          backgroundColor: "#e6f7ed",
          borderColor: theme.palette.success.main,
        };
      case "error":
        return {
          color: theme.palette.error.main,
          backgroundColor: "#fdeded",
          borderColor: theme.palette.error.main,
        };
      case "warning":
        return {
          color: theme.palette.warning.main,
          backgroundColor: "#fff8e6",
          borderColor: theme.palette.warning.main,
        };
      case "info":
      default:
        return {
          color: theme.palette.primary.main,
          backgroundColor: "#e6f0fb",
          borderColor: theme.palette.primary.main,
        };
    }
  };

  const styles = getStyles();

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      sx={{
        mt: 6,
        mr: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: styles.backgroundColor,
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          overflow: "hidden",
          width: { xs: "92%", sm: 400 },
          border: `1px solid ${styles.borderColor}`,
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 5,
            backgroundColor: styles.color,
          },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 1.5,
            pl: 3,
            display: "flex",
            alignItems: "center",
            color: styles.color,
          }}
        >
          {getIcon()}
        </Box>
        <Box sx={{ p: 2, pl: 1, flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {message}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            mr: 1.5,
            color: alpha(styles.color, 0.8),
            "&:hover": {
              backgroundColor: alpha(styles.color, 0.1),
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default NotificationSnackbar;
