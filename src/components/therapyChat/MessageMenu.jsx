import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ContentCopy,
  DeleteOutline,
  BookmarkBorder,
  Share,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const MessageMenu = ({
  anchorEl,
  open,
  handleClose,
  handleCopy,
  handleDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          mt: 0.5,
          border: "1px solid rgba(0,0,0,0.04)",
          minWidth: 180,
        },
      }}
      elevation={0}
    >
      <MenuItem onClick={handleCopy} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <ContentCopy fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText primary={t("copy")} />
      </MenuItem>

      {/* <Divider sx={{ my: 1 }} /> */}

      <MenuItem onClick={handleDelete} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <DeleteOutline fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText primary={t("delete")} sx={{ color: "error.main" }} />
      </MenuItem>
    </Menu>
  );
};

export default MessageMenu;
