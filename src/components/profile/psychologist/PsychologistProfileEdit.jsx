import React from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import ProfileEditForm from "../ProfileEditForm";

const PsychologistProfileEdit = ({
  profile,
  onSave,
  onCancel,
  onAvatarUpload,
  loading,
  error,
  fields,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
          background:
            "linear-gradient(to right, rgba(69, 104, 220, 0.05), rgba(176, 106, 179, 0.05))",
        }}
      >
        <IconButton onClick={onCancel} sx={{ mr: 2 }} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight="600">
          {t("editProfile")}
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 2 }}>
        <ProfileEditForm
          profile={profile}
          onSave={onSave}
          onAvatarUpload={(file) => onAvatarUpload(file)}
          loading={loading}
          error={error}
          fields={fields}
        />
      </Box>

      <Divider />

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "flex-end",
          background:
            "linear-gradient(to right, rgba(69, 104, 220, 0.02), rgba(176, 106, 179, 0.02))",
        }}
      >
        <Button variant="outlined" onClick={onCancel} sx={{ mr: 2 }}>
          {t("cancel")}
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="profile-edit-form"
          sx={{
            background: "linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #3a57c5 0%, #9a5aa0 100%)",
            },
          }}
        >
          {t("save")}
        </Button>
      </Box>
    </Card>
  );
};

export default PsychologistProfileEdit;
