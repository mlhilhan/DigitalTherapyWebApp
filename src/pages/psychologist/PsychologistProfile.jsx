import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Alert,
  Card,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { Person, Settings, School, Work } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  GetPsychologistProfile,
  UpdatePsychologistProfile,
  UploadPsychologistProfileImage,
} from "../../features/profile/psychologistProfileSlice";
import LoadingComponent, {
  LOADING_TYPES,
} from "../../components/common/LoadingComponent";
import { toast } from "react-toastify";
import appLanguages from "../../config/appLanguages";
import PsychologistProfileHeader from "../../components/profile/psychologist/PsychologistProfileHeader";
import PsychologistProfileEdit from "../../components/profile/psychologist/PsychologistProfileEdit";
import PsychologistEducationTab from "../../components/profile/psychologist/PsychologistEducationTab";
import PsychologistExperienceTab from "../../components/profile/psychologist/PsychologistExperienceTab";
import PsychologistPersonalInfoTab from "../../components/profile/psychologist/PsychologistPersonalInfoTab";
import PsychologistSettingsTab from "../../components/profile/psychologist/PsychologistSettingsTab";
import PsychologistStatsCard from "../../components/profile/psychologist/PsychologistStatsCard";
import NotificationPreferences from "../../components/profile/NotificationPreferences";
import TabPanel from "../../components/common/TabPanel";

const PsychologistProfile = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector(
    (state) => state.psychologist
  );
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (user?.userId) {
      dispatch(GetPsychologistProfile(user.userId));
    }
  }, [dispatch, user]);

  const handleNotificationModalOpen = () => {
    setNotificationModalOpen(true);
  };

  const handleNotificationModalClose = () => {
    setNotificationModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = async (formData) => {
    try {
      const currentLanguage = i18n.language;
      const preferredLanguage = formData.get("preferredLanguage");

      await dispatch(
        UpdatePsychologistProfile({ profileData: formData })
      ).unwrap();

      if (preferredLanguage && preferredLanguage !== currentLanguage) {
        await i18n.changeLanguage(preferredLanguage);
      }

      toast.success(t("profileUpdatedSuccessfully"));
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || t("profileupdatedFailed"));
    }
  };

  const handleAvatarUpload = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t("invalidImageFormat"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("imageTooLarge"));
      return;
    }

    dispatch(
      UploadPsychologistProfileImage({ id: user.userId, imageFile: file })
    )
      .unwrap()
      .then(() => {
        toast.success(t("profileImageUpdated"));
        dispatch(GetPsychologistProfile(user.userId));
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
      label: t("professionalBio"),
      type: "text",
      multiline: true,
      rows: 6,
      gridSize: 12,
      helperText: t("bioHelperText"),
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
    {
      name: "institutionId",
      label: t("institution"),
      type: "select",
      options: [
        {
          value: "123e4567-e89b-12d3-a456-426614174000",
          label: "Özel Terapi Merkezi",
        },
        {
          value: "223e4567-e89b-12d3-a456-426614174001",
          label: "İstanbul Hastanesi",
        },
        {
          value: "323e4567-e89b-12d3-a456-426614174002",
          label: "Ankara Psikoloji Merkezi",
        },
      ],
    },
  ];

  if (loading && !profile) {
    return <LoadingComponent type={LOADING_TYPES.PROFILE} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {isEditing ? (
        <PsychologistProfileEdit
          profile={profile}
          onSave={handleProfileUpdate}
          onCancel={handleEditToggle}
          onAvatarUpload={handleAvatarUpload}
          loading={loading}
          error={error}
          fields={profileFields}
        />
      ) : (
        <>
          <PsychologistProfileHeader
            profile={profile}
            onEditClick={handleEditToggle}
            onAvatarUpload={handleAvatarUpload}
          />

          <Grid container spacing={4}>
            {/* Left column - Professional Information */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
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
                    icon={<School />}
                    label={t("education")}
                    iconPosition={isMobile ? "top" : "start"}
                    sx={{ py: 1.5 }}
                  />
                  <Tab
                    icon={<Work />}
                    label={t("experience")}
                    iconPosition={isMobile ? "top" : "start"}
                    sx={{ py: 1.5 }}
                  />
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
                  <PsychologistEducationTab />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <PsychologistExperienceTab />
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <PsychologistPersonalInfoTab profile={profile} user={user} />
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <PsychologistSettingsTab
                    profile={profile}
                    onNotificationModalOpen={handleNotificationModalOpen}
                  />
                </TabPanel>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <PsychologistStatsCard />
            </Grid>
          </Grid>
        </>
      )}

      {notificationModalOpen && (
        <NotificationPreferences onClose={handleNotificationModalClose} />
      )}
    </Container>
  );
};

export default PsychologistProfile;
