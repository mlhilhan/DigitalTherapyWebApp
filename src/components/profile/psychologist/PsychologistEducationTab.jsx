import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  useTheme,
  Button,
  Divider,
} from "@mui/material";
import { School, Add, Psychology } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Education tab component for psychologist profile
 * Displays education history, certifications, and research interests
 */
const PsychologistEducationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Sample data for education info
  // In a real app, this would come from props or API
  const educationData = {
    education: [
      {
        degree: "Doktora",
        field: "Klinik Psikoloji",
        institution: "İstanbul Üniversitesi",
        year: "2018",
      },
      {
        degree: "Yüksek Lisans",
        field: "Psikoloji",
        institution: "Ankara Üniversitesi",
        year: "2015",
      },
      {
        degree: "Lisans",
        field: "Psikoloji",
        institution: "Boğaziçi Üniversitesi",
        year: "2013",
      },
    ],
    certifications: [
      "Bilişsel Davranışçı Terapi Sertifikası",
      "EMDR Terapisi Sertifikası",
      "Çift Terapisi Eğitimi",
    ],
    researchInterests: [
      "Depresyon Tedavisinde Yeni Yaklaşımlar",
      "Dijital Sağlık Teknolojileri",
      "Çevrimiçi Terapi Etkinliği",
    ],
  };

  return (
    <Box sx={{ height: "100%", p: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t("educationAndCertifications")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          size="small"
          sx={{ borderRadius: 2 }}
        >
          {t("addNew")}
        </Button>
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mt: 3, mb: 2, color: "primary.main" }}
      >
        {t("education")}
      </Typography>
      {educationData.education.map((edu, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              borderColor: "primary.light",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <School color="primary" sx={{ mr: 1.5, mt: 0.3 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {edu.degree} - {edu.field}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.institution}, {edu.year}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mt: 4, mb: 2, color: "primary.main" }}
      >
        {t("certifications")}
      </Typography>
      <Grid container spacing={2}>
        {educationData.certifications.map((cert, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                height: "100%",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  borderColor: "primary.light",
                },
              }}
            >
              <Typography variant="body1">{cert}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mt: 4, mb: 2, color: "primary.main" }}
      >
        {t("researchInterests")}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {educationData.researchInterests.map((interest, index) => (
          <Chip
            key={index}
            label={interest}
            icon={<Psychology fontSize="small" />}
            variant="outlined"
            sx={{
              mb: 1,
              px: 1,
              borderRadius: 2,
              borderColor: theme.palette.primary.light,
              "&:hover": {
                backgroundColor: "rgba(69, 104, 220, 0.08)",
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Add />}
          sx={{ borderRadius: 2, px: 3 }}
        >
          {t("addResearchInterest")}
        </Button>
      </Box>
    </Box>
  );
};

export default PsychologistEducationTab;
