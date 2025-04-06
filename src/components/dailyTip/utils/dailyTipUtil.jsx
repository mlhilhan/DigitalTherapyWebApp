import React from "react";
import {
  TipsAndUpdates,
  SelfImprovement,
  Spa,
  Psychology,
  Favorite,
  AccessTime,
  NightlightRound,
  Restaurant,
} from "@mui/icons-material";

export const CATEGORIES = [
  { id: "all", label: "allTips", icon: <TipsAndUpdates /> },
  { id: "stress", label: "stressManagement", icon: <SelfImprovement /> },
  { id: "mindfulness", label: "mindfulness", icon: <Spa /> },
  { id: "anxiety", label: "anxietyReduction", icon: <Psychology /> },
  { id: "relationships", label: "relationships", icon: <Favorite /> },
  { id: "productivity", label: "productivity", icon: <AccessTime /> },
  { id: "sleep", label: "sleepImprovement", icon: <NightlightRound /> },
  { id: "nutrition", label: "nutrition", icon: <Restaurant /> },
];

export const TIPS_DATA = [
  {
    id: 1,
    title: "twoOneBreathingTechniqueTitle",
    category: "stress",
    shortDescription: "twoOneBreathingTechniqueDesc",
    content: "twoOneBreathingTechniqueContent",
    icon: <SelfImprovement />,
    color: "#4CAF50",
  },
  {
    id: 2,
    title: "mindfulMorningTitle",
    category: "mindfulness",
    shortDescription: "mindfulMorningDesc",
    content: "mindfulMorningContent",
    icon: <Spa />,
    color: "#7E57C2",
  },
  {
    id: 3,
    title: "worriedThoughtTitle",
    category: "anxiety",
    shortDescription: "worriedThoughtDesc",
    content: "worriedThoughtContent",
    icon: <Psychology />,
    color: "#5C6BC0",
  },
  {
    id: 4,
    title: "activeTipsTitle",
    category: "relationships",
    shortDescription: "activeTipsDesc",
    content: "activeTipsContent",
    icon: <Favorite />,
    color: "#EC407A",
  },
  {
    id: 5,
    title: "bedtimeRoutineTitle",
    category: "sleep",
    shortDescription: "bedtimeRoutineDesc",
    content: "bedtimeRoutineContent",
    icon: <NightlightRound />,
    color: "#5E35B1",
  },
  {
    id: 6,
    title: "nutritionMoodTitle",
    category: "nutrition",
    shortDescription: "nutritionMoodDesc",
    content: "nutritionMoodContent",
    icon: <Restaurant />,
    color: "#FF9800",
  },
  {
    id: 7,
    title: "timeManagementTitle",
    category: "productivity",
    shortDescription: "timeManagementDesc",
    content: "timeManagementContent",
    icon: <AccessTime />,
    color: "#00ACC1",
  },
  {
    id: 8,
    title: "gratitudePracticeTitle",
    category: "mindfulness",
    shortDescription: "gratitudePracticeDesc",
    content: "gratitudePracticeContent",
    icon: <Spa />,
    color: "#7E57C2",
  },
  {
    id: 9,
    title: "socialConnectionTitle",
    category: "relationships",
    shortDescription: "socialConnectionDesc",
    content: "socialConnectionContent",
    icon: <Favorite />,
    color: "#EC407A",
  },
  {
    id: 10,
    title: "cognitiveReframingTitle",
    category: "anxiety",
    shortDescription: "cognitiveReframingDesc",
    content: "cognitiveReframingContent",
    icon: <Psychology />,
    color: "#5C6BC0",
  },
];

/**
 * Belirli bir kategoriye ait ipuçlarını filtreleyen fonksiyon
 * @param {string} category - Filtrelenecek kategori ID'si
 * @param {array} tips - İpuçları dizisi
 * @returns {array} - Filtrelenmiş ipuçları
 */
export const filterTipsByCategory = (category, tips = TIPS_DATA) => {
  if (category === "all") return tips;
  return tips.filter((tip) => tip.category === category);
};

/**
 * Günün ipucunu döndüren fonksiyon
 * @param {array} tips - İpuçları dizisi
 * @returns {object} - Günün ipucu
 */
export const getTipOfTheDay = (tips = TIPS_DATA) => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return tips[dayOfYear % tips.length];
};

/**
 * Rastgele bir ipucu döndüren fonksiyon
 * @param {array} tips - İpuçları dizisi
 * @returns {object} - Rastgele ipucu
 */
export const getRandomTip = (tips = TIPS_DATA) => {
  return tips[Math.floor(Math.random() * tips.length)];
};

/**
 * Kategori ID'sine göre kategori bilgisini döndüren fonksiyon
 * @param {string} categoryId - Kategori ID'si
 * @returns {object} - Kategori nesnesi
 */
export const getCategoryById = (categoryId) => {
  return CATEGORIES.find((cat) => cat.id === categoryId) || CATEGORIES[0];
};

export default {
  CATEGORIES,
  TIPS_DATA,
  filterTipsByCategory,
  getTipOfTheDay,
  getRandomTip,
  getCategoryById,
};
