import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Avatar,
  Alert,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Person,
  Settings,
  CameraAlt,
  Email,
  Phone,
  Cake,
  Translate,
  Wc,
  ArrowBack,
  NotificationsActive,
  VpnKey,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";
import ProfileEditForm from "../../components/profile/ProfileEditForm";
import { useTranslation } from "react-i18next";
import {
  GetPatientProfile,
  UpdatePatientProfile,
  UploadProfileImage,
} from "../../features/profile/profileSlice";
import LoadingComponent, {
  LOADING_TYPES,
} from "../../components/common/LoadingComponent";
import { toast } from "react-toastify";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      style={{
        display: value === index ? "flex" : "none",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

const PatientProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.profile);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fileInputRef = React.useRef(null);

  let appLanguages = [
    { value: "tr", label: "Türkçe" },
    { value: "en", label: "English" },
    { value: "ar", label: "عربية" },
    { value: "es", label: "Español" },
    { value: "ru", label: "русский язык" },
    { value: "zh", label: "中文" },
  ];

  useEffect(() => {
    if (user?.userId) {
      dispatch(GetPatientProfile(user.userId));
    }
  }, [dispatch, user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // const handleProfileUpdate = (formData) => {
  //   dispatch(UpdatePatientProfile(formData))
  //     .unwrap()
  //     .then(() => {
  //       setIsEditing(false);
  //       const preferredLanguage = formData.get("preferredLanguage");
  //       i18n.changeLanguage(preferredLanguage);
  //       toast.success(t("profileUpdatedSuccessfully"));
  //     })
  //     .catch((error) => {
  //       if (error.statusCode === 200) {
  //         toast.error(error.message);
  //       } else {
  //         toast.error(t("profileupdatedFailed"));
  //       }
  //     });
  // };
  const handleProfileUpdate = async (formData) => {
    try {
      const currentLanguage = i18n.language;
      const preferredLanguage = formData.get("preferredLanguage");

      await dispatch(UpdatePatientProfile(formData)).unwrap();

      if (preferredLanguage && preferredLanguage !== currentLanguage) {
        await i18n.changeLanguage(preferredLanguage);
      }

      toast.success(t("profileUpdatedSuccessfully"));
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || t("profileupdatedFailed"));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t("invalidImageFormat"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("imageTooLarge"));
      return;
    }

    dispatch(UploadProfileImage({ id: user.userId, imageFile: file }))
      .unwrap()
      .then(() => {
        toast.success(t("profileImageUpdated"));
        dispatch(GetPatientProfile(user.userId));
      })
      .catch((error) => {
        const message = t("profileImageUpdateFailed") + ": " + error;
        toast.error(message);
      });
  };

  const profileFields = [
    {
      name: "firstName",
      label: t("name"),
      type: "text",
      rules: { required: t("nameIsRequired") },
    },
    {
      name: "lastName",
      label: t("surname"),
      type: "text",
      rules: { required: t("surnameIsRequired") },
    },
    { name: "birthDate", label: t("birthdate"), type: "date" },
    {
      name: "gender",
      label: t("gender"),
      type: "select",
      options: [
        { value: "male", label: t("male") },
        { value: "female", label: t("female") },
      ],
    },
    {
      name: "bio",
      label: t("about"),
      type: "text",
      multiline: true,
      rows: 4,
      gridSize: 12,
    },
    {
      name: "preferredLanguage",
      label: t("preferredLanguage"),
      type: "select",
      options: appLanguages,
    },
    {
      name: "email",
      label: t("email"),
      type: "email",
      rules: {
        required: t("emailIsRequired"),
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: t("invalidEmailFormat"),
        },
      },
    },
    {
      name: "phoneNumber",
      label: t("phoneNumber"),
      placeHolder: "+901234567890",
      type: "text",
      rules: {
        pattern: {
          value: /^\+\d{1,14}$/,
          message: t("pleasePhoneNumberEnterAreaCode"),
        },
      },
    },
  ];

  if (loading && !profile) {
    return <LoadingComponent type={LOADING_TYPES.PROFILE} />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
          }}
        >
          {error}
        </Alert>
      )}

      {isEditing ? (
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
            }}
          >
            <IconButton
              onClick={handleEditToggle}
              sx={{ mr: 2 }}
              color="primary"
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" fontWeight="600">
              {t("editProfile")}
            </Typography>
          </Box>

          <Box sx={{ px: 3, py: 2 }}>
            <ProfileEditForm
              profile={profile}
              onSave={handleProfileUpdate}
              onAvatarUpload={(file) =>
                handleAvatarUpload({ target: { files: [file] } })
              }
              loading={loading}
              error={error}
              fields={profileFields}
            />
          </Box>

          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "flex-end",
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleEditToggle}
              sx={{ mr: 2 }}
            >
              {t("cancel")}
            </Button>
            <Button variant="contained" type="submit" form="profile-edit-form">
              {t("save")}
            </Button>
          </Box>
        </Card>
      ) : (
        <>
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
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                height: 150,
              }}
            />

            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEditToggle}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#2575fc",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              {t("edit")}
            </Button>

            <CardContent sx={{ pb: 3, position: "relative", mt: -5 }}>
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
                        width: 110,
                        height: 110,
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
                    {profile?.firstName} {profile?.lastName}
                  </Typography>
                  <Chip
                    label={t("patient")}
                    color="primary"
                    size="small"
                    sx={{
                      fontSize: "0.75rem",
                      height: 24,
                    }}
                  />
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
                  }}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {profile.bio}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              minHeight: "500px",
              minWidth: "900px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
                "& .MuiTab-root": {
                  minHeight: 60,
                  fontWeight: 600,
                  transition: "0.3s",
                  "&.Mui-selected": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <Tab
                icon={<Person />}
                label={t("personalInformation")}
                iconPosition={isMobile ? "top" : "start"}
                sx={{ py: 1.5 }}
              />
              <Tab
                icon={<Settings />}
                label={t("accountSettings")}
                iconPosition={isMobile ? "top" : "start"}
                sx={{ py: 1.5 }}
              />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ height: "100%" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InfoItem
                      icon={<Person color="primary" />}
                      label={t("fullName")}
                      value={
                        profile?.firstName && profile?.lastName
                          ? `${profile.firstName} ${profile.lastName}`
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
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ height: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Settings
                    sx={{ mr: 1, color: "primary.main" }}
                    fontSize="small"
                  />
                  {t("accountSettings")}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        p: 2,
                        boxShadow: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <NotificationsActive color="primary" sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t("notificationPreferences")}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {profile?.notificationPreferences || t("notSetUp")}
                          </Typography>
                        </Box>
                      </Box>
                      <Button variant="outlined" size="small">
                        {t("manage")}
                      </Button>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        p: 2,
                        boxShadow: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <VpnKey color="primary" sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t("password")}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {t("lastUpdated")}:{" "}
                            {profile?.passwordLastUpdated || "-"}
                          </Typography>
                        </Box>
                      </Box>
                      <Button variant="contained" size="small">
                        {t("changePassword")}
                      </Button>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ height: "150px" }} />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Card>
        </>
      )}
    </Container>
  );
};

const InfoItem = ({ icon, label, value }) => {
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

export default PatientProfile;
