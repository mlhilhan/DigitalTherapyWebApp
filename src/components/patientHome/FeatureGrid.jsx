import React from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  Avatar,
  IconButton,
  alpha,
} from "@mui/material";
import {
  Psychology,
  History,
  TipsAndUpdates,
  Mood,
  ArrowForward,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const IconMapper = {
  Psychology: <Psychology />,
  History: <History />,
  TipsAndUpdates: <TipsAndUpdates />,
  Mood: <Mood />,
};

const FeatureCard = ({ feature }) => {
  const theme = useTheme();

  const handleIconClick = (e) => {
    e.stopPropagation();
    feature.action();
  };

  return (
    <Card
      elevation={0}
      onClick={feature.action}
      sx={{
        height: "100%",
        p: 2,
        borderRadius: 4,
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: `1px solid ${alpha(feature.color, 0.2)}`,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 10px 20px ${alpha(feature.color, 0.2)}`,
          bgcolor: alpha(feature.color, 0.05),
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Avatar
          sx={{
            bgcolor: alpha(feature.color, 0.1),
            color: feature.color,
            width: 56,
            height: 56,
            mb: 2,
            "& .MuiSvgIcon-root": {
              fontSize: 30,
            },
          }}
        >
          {IconMapper[feature.icon] || <Psychology />}
        </Avatar>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {feature.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {feature.description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            size="small"
            onClick={handleIconClick}
            sx={{
              bgcolor: alpha(feature.color, 0.1),
              color: feature.color,
              "&:hover": {
                bgcolor: alpha(feature.color, 0.2),
              },
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

const FeatureGrid = ({ features }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <FeatureCard feature={feature} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureGrid;
