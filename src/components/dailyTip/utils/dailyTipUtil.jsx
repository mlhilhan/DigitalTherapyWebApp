import React from "react";
import {
  SelfImprovement,
  Psychology,
  Spa,
  NightlightRound,
  Favorite,
  TipsAndUpdates,
  Restaurant,
  AccessTime,
} from "@mui/icons-material";

export const getCategoryIcon = (categoryKey) => {
  const iconMap = {
    stress: <SelfImprovement />,
    mindfulness: <Spa />,
    anxiety: <Psychology />,
    relationships: <Favorite />,
    productivity: <AccessTime />,
    sleep: <NightlightRound />,
    nutrition: <Restaurant />,
  };

  return iconMap[categoryKey] || <TipsAndUpdates />;
};

export const getCategoryColor = (categoryKey) => {
  const colorMap = {
    stress: "#4CAF50", // Yeşil
    mindfulness: "#7E57C2", // Mor
    anxiety: "#5C6BC0", // Mavi
    relationships: "#EC407A", // Pembe
    productivity: "#00ACC1", // Turkuaz
    sleep: "#5E35B1", // Koyu Mor
    nutrition: "#FF9800", // Turuncu
  };

  return colorMap[categoryKey] || "#2196F3"; // Varsayılan mavi
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export default {
  getCategoryIcon,
  getCategoryColor,
  formatDate,
  truncateText,
};
