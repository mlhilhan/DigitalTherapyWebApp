import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import {
  Person,
  Cake,
  Wc,
  Email,
  Phone,
  Translate,
  LocalHospital,
} from "@mui/icons-material";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";
import { useTranslation } from "react-i18next";
import appLanguages from "../../../config/appLanguages";

const InfoItem = ({ icon, label, value }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          borderColor: "primary.light",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        {icon}
        <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
          {label}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          wordBreak: "break-word",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const PsychologistPersonalInfoTab = ({ profile, user }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        {t("personalInformation")}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InfoItem
            icon={<Person color="primary" />}
            label={t("fullName")}
            value={
              profile?.firstName && profile?.lastName
                ? `Dr. ${profile.firstName} ${profile.lastName}`
                : "-"
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InfoItem
            icon={<Cake color="primary" />}
            label={t("birthdate")}
            value={
              profile?.birthDate
                ? format(new Date(profile.birthDate), "PP", {
                    locale: trLocale,
                  })
                : "-"
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InfoItem
            icon={<Wc color="primary" />}
            label={t("gender")}
            value={
              profile?.gender === "male"
                ? t("male")
                : profile?.gender === "female"
                ? t("female")
                : "-"
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InfoItem
            icon={<Email color="primary" />}
            label={t("email")}
            value={user?.email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InfoItem
            icon={<Phone color="primary" />}
            label={t("phoneNumber")}
            value={profile?.phoneNumber || "-"}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InfoItem
            icon={<Translate color="primary" />}
            label={t("preferredLanguage")}
            value={
              profile?.preferredLanguage
                ? appLanguages.find(
                    (lang) => lang.value === profile.preferredLanguage
                  )?.label
                : "-"
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InfoItem
            icon={<LocalHospital color="primary" />}
            label={t("institution")}
            value={profile?.institution?.name || "Özel Terapi Merkezi"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PsychologistPersonalInfoTab;
