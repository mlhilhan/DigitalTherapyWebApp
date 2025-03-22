import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Tabs,
  Tab,
  Button,
  Avatar,
  Skeleton,
  Alert,
  Grid,
} from "@mui/material";
import { Edit, Person, Settings } from "@mui/icons-material";
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
import { toast } from "react-toastify";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
    >
      {value === index && (
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
      )}
    </div>
  );
}

const PatientProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.profile);
  const { t } = useTranslation();

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

  const handleProfileUpdate = (formData) => {
    dispatch(UpdatePatientProfile(formData))
      .unwrap()
      .then(() => {
        setIsEditing(false);
        toast.success(t("profileUpdatedSuccessfully"));
      })
      .catch((error) => {
        if (error.statusCode === 200) {
          toast.error(error.message);
        } else {
          toast.error(t("profileupdatedFailed"));
        }
      });
  };

  const handleAvatarUpload = (file) => {
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
      options: [
        { value: "tr", label: "Türkçe" },
        { value: "en", label: "English" },
      ],
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
      type: "text",
      rules: {
        pattern: {
          value: /^(\+90|0)?[0-9]{10}$/,
          message: t("invalidPhoneFormat"),
        },
      },
    },
  ];

  // Loading state
  if (loading && !profile) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isEditing ? (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {t("editProfile")}
          </Typography>
          <ProfileEditForm
            profile={profile}
            onSave={handleProfileUpdate}
            onAvatarUpload={handleAvatarUpload}
            loading={loading}
            error={error}
            fields={profileFields}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleEditToggle}
              sx={{ ml: 2 }}
            >
              {t("cancel")}
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 4,
              borderRadius: 2,
              background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEditToggle}
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {t("edit")}
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                src={profile?.avatarUrl}
                alt={profile?.firstName}
                sx={{
                  width: 100,
                  height: 100,
                  mr: { xs: 0, sm: 3 },
                  mb: { xs: 2, sm: 0 },
                }}
              />
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography
                  variant="h4"
                  sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                >
                  {profile?.firstName} {profile?.lastName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {t("patient")}
                </Typography>
              </Box>
            </Box>

            {profile?.bio && (
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                {profile.bio}
              </Typography>
            )}
          </Paper>

          <Paper elevation={3} sx={{ borderRadius: 2, minHeight: "400px" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                "& .MuiTabs-flexContainer": {
                  borderBottom: 1,
                  borderColor: "divider",
                },
              }}
            >
              <Tab icon={<Person />} label={t("personalInformation")} />
              <Tab icon={<Settings />} label={t("accountSettings")} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {t("fullName")}
                  </Typography>
                  <Typography variant="body1">
                    {profile?.firstName} {profile?.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {t("birthdate")}
                  </Typography>
                  <Typography variant="body1">
                    {profile?.birthDate
                      ? format(new Date(profile.birthDate), "PP", {
                          locale: trLocale,
                        })
                      : "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {t("gender")}
                  </Typography>
                  <Typography variant="body1">
                    {profile?.gender === "male"
                      ? t("male")
                      : profile?.gender === "female"
                      ? t("female")
                      : "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {t("email")}
                  </Typography>
                  <Typography variant="body1">{user?.email}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {t("preferredLanguage")}
                  </Typography>
                  <Typography variant="body1">
                    {profile?.preferredLanguage === "tr"
                      ? "Türkçe"
                      : profile?.preferredLanguage === "en"
                      ? "English"
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                {t("accountSettings")}
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {t("notificationPreferences")}
                  </Typography>
                  <Typography variant="body1">
                    {profile?.notificationPreferences || "Ayarlanmamış"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" color="primary">
                    {t("changePassword")}
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default PatientProfile;
