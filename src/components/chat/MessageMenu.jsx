import React from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { ContentCopy, DeleteOutline } from "@mui/icons-material";
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
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <MenuItem onClick={handleCopy}>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("copy")} />
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <DeleteOutline fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText primary={t("delete")} sx={{ color: "error.main" }} />
      </MenuItem>
    </Menu>
  );
};

export default MessageMenu;
