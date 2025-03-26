import React, { useState, useRef } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
  Badge,
  Chip,
  Divider,
  Tooltip,
  IconButton,
  useTheme,
} from "@mui/material";
import { Edit, CameraAlt, Star, LocalHospital } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Profile header component for psychologists
 * Displays profile image, name, specialties, and brief stats
 */
const PsychologistProfileHeader = ({
  profile,
  onEditClick,
  onAvatarUpload,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [imageHover, setImageHover] = useState(false);
  const fileInputRef = useRef(null);

  // Sample data - should come from props or API in real implementation
  const specialties = [
    "Anksiyete",
    "Depresyon",
    "Travma Sonrası Stres Bozukluğu",
    "Aile Terapisi",
  ];

  const stats = {
    averageRating: 4.8,
    totalSessions: 156,
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onAvatarUpload(file);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        mb: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)",
          height: 200,
        }}
      />

      <Button
        variant="contained"
        startIcon={<Edit />}
        onClick={onEditClick}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 10,
          fontSize: { xs: "0.875rem", sm: "1rem" },
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#4568dc",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        {t("edit")}
      </Button>

      <CardContent sx={{ pb: 3, position: "relative", mt: -10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-end" },
            mb: 4,
          }}
        >
          <Box
            sx={{
              position: "relative",
              mr: { xs: 0, sm: 3 },
              mb: { xs: 2, sm: 0 },
            }}
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Tooltip title={t("changeProfilePicture")}>
                  <IconButton
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: 36,
                      height: 36,
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                      opacity: imageHover ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onClick={handleImageClick}
                  >
                    <CameraAlt fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
            >
              <Avatar
                src={profile?.avatarUrl}
                alt={profile?.firstName}
                sx={{
                  width: 130,
                  height: 130,
                  border: "4px solid white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  opacity: imageHover ? 0.9 : 1,
                  transition: "opacity 0.3s ease",
                }}
                onClick={handleImageClick}
              />
            </Badge>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
            />
          </Box>

          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
                fontWeight: "600",
                marginBottom: 0.5,
              }}
            >
              Dr. {profile?.firstName} {profile?.lastName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: { xs: "center", sm: "flex-start" },
                mb: 1,
              }}
            >
              <Chip
                label={t("psychologist")}
                color="primary"
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  height: 24,
                }}
              />
              <Chip
                icon={<LocalHospital fontSize="small" />}
                label={profile?.institution?.name || "Özel Terapi Merkezi"}
                variant="outlined"
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  height: 24,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 1,
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Star sx={{ color: "#FFD700", fontSize: "1rem", mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {stats.averageRating}/5.0
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {stats.totalSessions} {t("sessionsCompleted")}
              </Typography>
            </Box>
          </Box>
        </Box>

        {profile?.bio && (
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 2.5,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              mb: 3,
              mt: 2,
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {profile.bio}
            </Typography>
          </Box>
        )}

        {/* Specialties */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {t("specialties")}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {specialties.map((specialty, index) => (
              <Chip
                key={index}
                label={specialty}
                sx={{
                  bgcolor: "rgba(69, 104, 220, 0.08)",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "rgba(69, 104, 220, 0.15)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PsychologistProfileHeader;
