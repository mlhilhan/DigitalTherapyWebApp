import React, { useState } from "react";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { TipsAndUpdates } from "@mui/icons-material";
import TipCard from "../../components/dailyTip/TipCard";
import {
  CATEGORIES,
  getTipOfTheDay,
  TIPS_DATA,
} from "../../components/dailyTip/utils/dailyTipUtil";

const DailyTips = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const categoryIds = CATEGORIES.map((cat) => cat.id);
    setSelectedCategory(categoryIds[newValue]);
  };

  const filteredTips = TIPS_DATA.filter(
    (tip) => selectedCategory === "all" || tip.category === selectedCategory
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
            <TipsAndUpdates sx={{ mr: 1, color: theme.palette.warning.main }} />
            <Typography
              variant="h6"
              fontWeight={600}
              color={theme.palette.warning.main}
            >
              {t("tipOfTheDay")}
            </Typography>
          </Box>
          <TipCard tip={getTipOfTheDay()} featured={true} theme={theme} t={t} />
        </CardContent>
      </Card>

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
          {CATEGORIES.map((category, index) => (
            <Tab
              key={category.id}
              label={t(category.label)}
              icon={category.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexWrap: "wrap",
          gap: 1,
          mb: 4,
        }}
      >
        {CATEGORIES.map((category) => (
          <Chip
            key={category.id}
            icon={category.icon}
            label={t(category.label)}
            onClick={() => handleCategoryChange(category.id)}
            color={selectedCategory === category.id ? "primary" : "default"}
            variant={selectedCategory === category.id ? "filled" : "outlined"}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {filteredTips.map((tip) => (
          <Grid item xs={12} sm={6} md={4} key={tip.id}>
            <TipCard tip={tip} theme={theme} t={t} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DailyTips;
