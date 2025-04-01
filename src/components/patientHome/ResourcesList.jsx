import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  alpha,
} from "@mui/material";
import {
  ArrowForward,
  Psychology,
  SelfImprovement,
  Bookmarks,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const ResourcesList = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const resources = [
    { title: t("sleepTips"), icon: <Bookmarks color="secondary" /> },
    {
      title: t("anxietyManagement"),
      icon: <SelfImprovement color="primary" />,
    },
    { title: t("stressRelief"), icon: <Psychology color="success" /> },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: `1px solid ${alpha("#000", 0.05)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          {t("helpfulResources")}
        </Typography>

        <List disablePadding>
          {resources.map((item, index) => (
            <ListItem
              key={index}
              button
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                mb: index < resources.length - 1 ? 1 : 0,
                bgcolor: alpha(theme.palette.background.default, 0.6),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
              <ArrowForward color="action" fontSize="small" />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ResourcesList;
