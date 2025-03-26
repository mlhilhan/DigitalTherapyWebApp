import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { BookmarkBorder, Bookmark, Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const MoodEntryCard = ({
  entry,
  onEdit,
  onDelete,
  onBookmark,
  getMoodColor,
  getMoodIcon,
  getMoodLabel,
  formatEntryDate,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          gap: 0.5,
        }}
      >
        <Tooltip
          title={entry.isBookmarked ? t("removeBookmark") : t("addBookmark")}
        >
          <IconButton size="small" onClick={() => onBookmark(entry.id)}>
            {entry.isBookmarked ? (
              <Bookmark color="primary" />
            ) : (
              <BookmarkBorder />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title={t("edit")}>
          <IconButton size="small" onClick={() => onEdit(entry)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("delete")}>
          <IconButton
            size="small"
            onClick={() => onDelete(entry.id)}
            color="error"
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {formatEntryDate(entry.date)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: getMoodColor(entry.moodLevel),
                color: "white",
                width: 40,
                height: 40,
              }}
            >
              {getMoodIcon(entry.moodLevel)}
            </Avatar>
            <Typography variant="h6">
              {getMoodLabel(entry.moodLevel)}
            </Typography>
          </Box>
        </Box>

        {entry.factors && entry.factors.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {t("factors")}:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {entry.factors.map((factor) => (
                <Chip
                  key={factor}
                  label={t(factor)}
                  size="small"
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        )}

        {entry.notes && (
          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {t("notes")}:
            </Typography>
            <Typography variant="body2">{entry.notes}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodEntryCard;
