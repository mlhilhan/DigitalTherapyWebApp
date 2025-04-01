import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import { Close, Warning, CheckCircle, Info } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * @param {boolean} open - Modalın açık olup olmadığı
 * @param {function} onClose - Modal kapatma işlevi
 * @param {function} onConfirm - Onay verildiğinde çağrılacak işlev
 * @param {any} itemId - İşlem yapılacak öğenin ID'si
 * @param {string} title - Modal başlığı (opsiyonel)
 * @param {string} message - Modal mesajı (opsiyonel)
 * @param {string} confirmButtonText - Onaylama butonu metni (opsiyonel)
 * @param {string} cancelButtonText - İptal butonu metni (opsiyonel)
 * @param {string} confirmColor - Onay butonunun rengi (primary, secondary, error, warning, success)
 * @param {string} type - Modal tipi (info, warning, success, error)
 * @param {string} warningMessage - Uyarı mesajı (opsiyonel)
 */

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  itemId,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  confirmColor = "primary",
  type = "warning",
  warningMessage,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleConfirm = () => {
    onConfirm(itemId);
    onClose();
  };

  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: (
            <CheckCircle
              sx={{ color: theme.palette.success.main, fontSize: 28 }}
            />
          ),
          bgColor: alpha(theme.palette.success.main, 0.08),
          color: theme.palette.success.main,
        };
      case "info":
        return {
          icon: <Info sx={{ color: theme.palette.info.main, fontSize: 28 }} />,
          bgColor: alpha(theme.palette.info.main, 0.08),
          color: theme.palette.info.main,
        };
      case "error":
        return {
          icon: (
            <Warning sx={{ color: theme.palette.error.main, fontSize: 28 }} />
          ),
          bgColor: alpha(theme.palette.error.main, 0.08),
          color: theme.palette.error.main,
        };
      case "warning":
      default:
        return {
          icon: (
            <Warning sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
          ),
          bgColor: alpha(theme.palette.warning.main, 0.08),
          color: theme.palette.warning.main,
        };
    }
  };

  const typeConfig = getTypeConfig();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
          maxWidth: 400,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: typeConfig.bgColor,
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {typeConfig.icon}
          <Typography
            id="confirmation-dialog-title"
            variant="h6"
            component="div"
            fontWeight="600"
          >
            {title || t("confirmationTitle")}
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme.palette.grey[500],
            "&:hover": {
              bgcolor: alpha(typeConfig.color, 0.12),
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <DialogContentText
          id="confirmation-dialog-description"
          sx={{ mb: 2, color: "text.primary" }}
        >
          {message || t("confirmationMessage")}
        </DialogContentText>

        {warningMessage && (
          <Box
            sx={{
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              p: 2,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Warning
              sx={{
                color: theme.palette.warning.dark,
                fontSize: 24,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {warningMessage}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            minWidth: 100,
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {cancelButtonText || t("cancel")}
        </Button>
        <Button
          onClick={handleConfirm}
          color={confirmColor}
          variant="contained"
          disableElevation
          sx={{
            minWidth: 100,
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              bgcolor: theme.palette[confirmColor].dark,
            },
          }}
        >
          {confirmButtonText || t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
