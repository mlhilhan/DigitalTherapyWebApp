// src/features/dailyTip/DailyTips.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  Tabs,
  Tab,
  Divider,
  alpha,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { TipsAndUpdates } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCategories,
  GetAllTips,
  GetTipsByCategory,
  GetTipOfTheDay,
} from "../../features/dailyTip/dailyTipSlice";
import TipCard from "../../components/dailyTip/TipCard";
import { getCategoryIcon } from "../../components/dailyTip/utils/dailyTipUtil";

const DailyTips = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTab, setSelectedTab] = useState(0);

  // Redux state'inden verileri al
  const { categories, tips, tipOfTheDay, loading, error } = useSelector(
    (state) => state.dailyTip
  );

  // Sayfa yüklendiğinde kategorileri, tüm ipuçlarını ve günün ipucunu getir
  useEffect(() => {
    const currentLang = i18n.language || "en";
    dispatch(GetCategories(currentLang));
    dispatch(GetAllTips(currentLang));
    dispatch(GetTipOfTheDay(currentLang));
  }, [dispatch, i18n.language]);

  // Kategori değiştiğinde ilgili ipuçlarını getir
  useEffect(() => {
    const currentLang = i18n.language || "en";
    if (selectedCategory === "all") {
      dispatch(GetAllTips(currentLang));
    } else {
      dispatch(
        GetTipsByCategory({
          categoryKey: selectedCategory,
          languageCode: currentLang,
        })
      );
    }
  }, [dispatch, selectedCategory, i18n.language]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Tab'ı da güncelle (mobil görünüm için)
    const categoryIndex = categories.findIndex(
      (cat) => cat.categoryKey === category
    );
    if (categoryIndex !== -1 || category === "all") {
      setSelectedTab(category === "all" ? 0 : categoryIndex + 1);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    // Kategori ID'sini de güncelle (Kategoriler + "all" seçeneği)
    const allCategories = [{ categoryKey: "all" }, ...categories];
    setSelectedCategory(allCategories[newValue]?.categoryKey || "all");
  };

  // Tüm kategorileri içeren bir dizi oluştur (mobil görünüm için)
  const allCategoriesWithAll = [
    { id: "all", label: "allTips", icon: <TipsAndUpdates /> },
    ...categories.map((category) => ({
      id: category.categoryKey,
      label: category.name,
      icon: getCategoryIcon(category.categoryKey),
    })),
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Başlık ve Açıklama */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          {t("dailyTipsAndMentalHealthGuide")}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: "auto" }}
        >
          {t("dailyTipsPageDescription")}
        </Typography>
      </Box>

      {/* Hata mesajı */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Günün İpucu */}
      {loading && !tipOfTheDay ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : tipOfTheDay ? (
        <Card
          elevation={0}
          sx={{
            mb: 5,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.warning.light,
              0.4
            )}, ${alpha(theme.palette.warning.main, 0.2)})`,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TipsAndUpdates
                sx={{ mr: 1, color: theme.palette.warning.main }}
              />
              <Typography
                variant="h6"
                fontWeight={600}
                color={theme.palette.warning.main}
              >
                {t("tipOfTheDay")}
              </Typography>
            </Box>
            <TipCard tip={tipOfTheDay} featured={true} />
          </CardContent>
        </Card>
      ) : null}

      {/* Mobil için Kategori Sekmeleri */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 4,
          display: { xs: "block", md: "none" },
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="tip categories tabs"
        >
          {allCategoriesWithAll.map((category) => (
            <Tab
              key={category.id}
              label={category.id === "all" ? t(category.label) : category.label}
              icon={category.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Masaüstü için Kategori Chip'leri */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexWrap: "wrap",
          gap: 1,
          mb: 4,
        }}
      >
        <Chip
          icon={<TipsAndUpdates />}
          label={t("allTips")}
          onClick={() => handleCategoryChange("all")}
          color={selectedCategory === "all" ? "primary" : "default"}
          variant={selectedCategory === "all" ? "filled" : "outlined"}
          sx={{ m: 0.5 }}
        />

        {categories.map((category) => (
          <Chip
            key={category.id}
            icon={getCategoryIcon(category.categoryKey)}
            label={category.name}
            onClick={() => handleCategoryChange(category.categoryKey)}
            color={
              selectedCategory === category.categoryKey ? "primary" : "default"
            }
            variant={
              selectedCategory === category.categoryKey ? "filled" : "outlined"
            }
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* İpuçları Grid'i */}
      {loading && tips.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {tips.length > 0 ? (
            tips.map((tip) => (
              <Grid item xs={12} sm={6} md={4} key={tip.id}>
                <TipCard tip={tip} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info">{t("noTipsFoundForCategory")}</Alert>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default DailyTips;
