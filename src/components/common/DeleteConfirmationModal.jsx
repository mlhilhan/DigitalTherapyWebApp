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
import { Close, DeleteOutline, Warning } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * @param {boolean} open - Modalın açık olup olmadığı
 * @param {function} onClose - Modal kapatma işlevi
 * @param {function} onConfirm - Silme onaylandığında çağrılacak işlev
 * @param {any} itemId - Silinecek öğenin ID'si
 * @param {string} title - Modal başlığı (opsiyonel)
 * @param {string} message - Modal mesajı (opsiyonel)
 * @param {string} confirmButtonText - Onaylama butonu metni (opsiyonel)
 * @param {string} cancelButtonText - İptal butonu metni (opsiyonel)
 */

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  itemId,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleConfirm = () => {
    onConfirm(itemId);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
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
          bgcolor: alpha(theme.palette.error.main, 0.08),
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Warning
            sx={{
              color: theme.palette.error.main,
              fontSize: 28,
            }}
          />
          <Typography
            id="delete-dialog-title"
            variant="h6"
            component="div"
            fontWeight="600"
          >
            {title || t("deleteConfirmationTitle")}
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme.palette.grey[500],
            "&:hover": {
              bgcolor: alpha(theme.palette.error.main, 0.12),
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <DialogContentText
          id="delete-dialog-description"
          sx={{ mb: 2, color: "text.primary" }}
        >
          {message || t("deleteConfirmationMessage")}
        </DialogContentText>

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
          <DeleteOutline
            sx={{
              color: theme.palette.warning.dark,
              fontSize: 24,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {t("deleteWarningMessage")}
          </Typography>
        </Box>
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
          color="error"
          variant="contained"
          disableElevation
          sx={{
            minWidth: 100,
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              bgcolor: theme.palette.error.dark,
            },
          }}
        >
          {confirmButtonText || t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
