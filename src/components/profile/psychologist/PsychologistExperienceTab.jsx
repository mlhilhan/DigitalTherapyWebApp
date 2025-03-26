import React from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  useTheme,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Work, Add, Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Experience tab component for psychologist profile
 * Displays professional experience history
 */
const PsychologistExperienceTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Sample data for experience
  // In a real app, this would come from props or API
  const experienceData = [
    {
      role: "Klinik Psikolog",
      organization: "Özel Terapi Merkezi",
      location: "İstanbul, Türkiye",
      description:
        "Bireysel terapi, çift terapisi ve aile terapisi hizmetleri sunma. Anksiyete bozuklukları, depresyon ve travma sonrası stres bozukluğu konularında uzmanlaşma.",
      startDate: "2018-09-01",
      endDate: null, // Current position
      duration: "2018 - Şu an",
    },
    {
      role: "Danışman Psikolog",
      organization: "Devlet Hastanesi",
      location: "Ankara, Türkiye",
      description:
        "Psikiyatri bölümünde danışman psikolog olarak görev yapma. Hastalar için değerlendirme ve terapi hizmetleri sunma, multidisipliner ekiplerle işbirliği yapma.",
      startDate: "2015-03-01",
      endDate: "2018-08-01",
      duration: "2015 - 2018",
    },
    {
      role: "Stajyer Psikolog",
      organization: "Üniversite Klinik Psikoloji Merkezi",
      location: "İstanbul, Türkiye",
      description:
        "Klinik eğitim programının bir parçası olarak staj yapma. Süpervizyon altında terapi oturumları gerçekleştirme.",
      startDate: "2014-09-01",
      endDate: "2015-02-01",
      duration: "2014 - 2015",
    },
  ];

  return (
    <Box sx={{ height: "100%", p: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t("professionalExperience")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          size="small"
          sx={{ borderRadius: 2 }}
        >
          {t("addExperience")}
        </Button>
      </Box>

      {experienceData.map((exp, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              borderColor: "primary.light",
            },
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              gap: 1,
            }}
          >
            <Tooltip title={t("edit")}>
              <IconButton size="small" color="primary">
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("delete")}>
              <IconButton size="small" color="error">
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Work color="primary" sx={{ mr: 2, mt: 0.3 }} />
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  pr: 7,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {exp.role}
                </Typography>
                <Chip
                  label={exp.duration}
                  size="small"
                  sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 1, sm: 0 } }}
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {exp.organization} • {exp.location}
              </Typography>

              {exp.description && (
                <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
                  {exp.description}
                </Typography>
              )}

              {index === 0 && ( // Only for current position
                <Chip
                  label={t("current")}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default PsychologistExperienceTab;
