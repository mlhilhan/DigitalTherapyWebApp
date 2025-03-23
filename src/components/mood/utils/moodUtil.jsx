import React from "react";
import {
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import { format, isToday, isYesterday } from "date-fns";
import trLocale from "date-fns/locale/tr";

export const MOOD_LEVELS = {
  VERY_HAPPY: {
    value: 5,
    icon: <SentimentVerySatisfied />,
    color: "#4caf50",
    label: "veryHappy",
  },
  HAPPY: {
    value: 4,
    icon: <SentimentSatisfied />,
    color: "#8bc34a",
    label: "happy",
  },
  NEUTRAL: {
    value: 3,
    icon: <SentimentNeutral />,
    color: "#ffeb3b",
    label: "neutral",
  },
  SAD: {
    value: 2,
    icon: <SentimentDissatisfied />,
    color: "#ff9800",
    label: "sad",
  },
  VERY_SAD: {
    value: 1,
    icon: <SentimentVeryDissatisfied />,
    color: "#f44336",
    label: "verySad",
  },
};

export const MOOD_FACTORS = [
  "work",
  "family",
  "health",
  "relationships",
  "finances",
  "leisure",
  "stress",
  "sleep",
];

export const getMoodColor = (moodLevel) => {
  const mood = Object.values(MOOD_LEVELS).find((m) => m.value === moodLevel);
  return mood ? mood.color : MOOD_LEVELS.NEUTRAL.color;
};

export const getMoodIcon = (moodLevel) => {
  const mood = Object.values(MOOD_LEVELS).find((m) => m.value === moodLevel);
  return mood ? mood.icon : MOOD_LEVELS.NEUTRAL.icon;
};

export const formatEntryDate = (dateString, t) => {
  const date = new Date(dateString);
  if (isToday(date)) {
    return `${t("today")}, ${format(date, "HH:mm")}`;
  } else if (isYesterday(date)) {
    return `${t("yesterday")}, ${format(date, "HH:mm")}`;
  } else {
    return format(date, "PPP", { locale: trLocale });
  }
};

export const getFilteredEntries = (entries, filterMode, filterDate) => {
  if (!entries || entries.length === 0) return [];

  let filtered = [...entries];

  if (filterMode === "today") {
    filtered = filtered.filter((entry) => isToday(new Date(entry.date)));
  } else if (filterMode === "week") {
    filtered = filtered.filter((entry) => isThisWeek(new Date(entry.date)));
  } else if (filterMode === "month") {
    filtered = filtered.filter((entry) => isThisMonth(new Date(entry.date)));
  } else if (filterMode === "bookmarked") {
    filtered = filtered.filter((entry) => entry.bookmarked);
  } else if (filterDate) {
    filtered = filtered.filter((entry) =>
      isSameDay(new Date(entry.date), filterDate)
    );
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Dummy veri
export const generateDummyEntries = () => {
  const today = new Date();

  return [
    {
      id: 1,
      mood: 5,
      factors: ["health", "leisure"],
      notes:
        "Bugün çok güzel bir gün geçirdim. Sabah erken kalkıp spor yaptım ve kendimi enerjik hissettim.",
      date: today.toISOString(),
      bookmarked: true,
    },
  ];
};
