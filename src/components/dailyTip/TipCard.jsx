import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Collapse,
  Chip,
  alpha,
  CardActions,
  Divider,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Bookmark,
  BookmarkBorder,
  Share,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ToggleBookmark } from "../../features/dailyTip/dailyTipSlice";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { getCategoryIcon } from "./utils/dailyTipUtil";

const TipCard = ({
  tip,
  featured = false,
  onBookmarkSuccess,
  onBookmarkError,
}) => {
  const [expanded, setExpanded] = useState(featured);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    dispatch(ToggleBookmark(tip.id))
      .unwrap()
      .then(() => {
        onBookmarkSuccess?.(
          tip.isBookmarked ? t("bookmarkRemoved") : t("bookmarkAdded")
        );
      })
      .catch((error) => {
        onBookmarkError?.(error.message || t("bookmarkError"));
      });
  };

  if (!tip) {
    return null;
  }

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: featured ? 2 : 4,
        border: featured
          ? "none"
          : `1px solid ${alpha(theme.palette.divider, 0.8)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: featured
            ? "none"
            : `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
          transform: featured ? "none" : "translateY(-4px)",
        },
        display: "flex",
        flexDirection: "column",
        bgcolor: featured
          ? "transparent"
          : alpha(theme.palette.background.paper, 0.8),
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(tip.color || theme.palette.primary.main, 0.1),
                color: tip.color || theme.palette.primary.main,
                mr: 2,
              }}
            >
              {tip.category && getCategoryIcon(tip.category.categoryKey)}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {tip.title}
              </Typography>
              {tip.category && (
                <Chip
                  label={tip.category.name}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ height: 22, fontSize: "0.75rem" }}
                />
              )}
            </Box>
          </Box>
          <IconButton
            onClick={handleBookmarkClick}
            size="small"
            sx={{
              color: tip.isBookmarked
                ? theme.palette.primary.main
                : "text.secondary",
            }}
            aria-label={tip.isBookmarked ? "remove bookmark" : "bookmark"}
          >
            {tip.isBookmarked ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {tip.shortDescription}
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" paragraph>
              {tip.content}
            </Typography>
            {featured && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ mt: 1, borderRadius: 6, textTransform: "none" }}
              >
                {t("tryThisTip")}
              </Button>
            )}
          </Box>
        </Collapse>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          p: 2,
          pt: 0,
          borderTop: expanded
            ? `1px solid ${alpha(theme.palette.divider, 0.8)}`
            : "none",
        }}
      >
        <Button
          onClick={handleExpandClick}
          endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
          }}
          size="small"
        >
          {expanded ? t("showLess") : t("readMore")}
        </Button>

        {!featured && (
          <Button
            size="small"
            startIcon={<Share fontSize="small" />}
            sx={{ textTransform: "none" }}
          >
            {t("share")}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TipCard;
