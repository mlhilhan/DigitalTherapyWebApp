import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Divider,
  useTheme,
  Tooltip,
  Badge,
  styled,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera, HighlightOff, Info, Check } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import trLocale from "date-fns/locale/tr";
import { useTranslation } from "react-i18next";
import { formatDateToISO } from "../../utils/dateUtils";

// Styled components
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

const ProfileEditForm = ({
  profile,
  onSave,
  onAvatarUpload,
  loading,
  error,
  fields,
}) => {
  const [avatar, setAvatar] = useState(profile?.avatarUrl || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [imageHover, setImageHover] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: profile || {},
    mode: "onChange",
  });

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file));

      if (onAvatarUpload) {
        onAvatarUpload(file);
      }
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    if (data.birthDate) {
      data.birthDate = formatDateToISO(data.birthDate);
    }

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    onSave(formData);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                label={field.label}
                variant="outlined"
                fullWidth
                type={field.type}
                onChange={onChange}
                value={value || ""}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
                inputRef={ref}
                disabled={field.disabled}
                multiline={field.multiline}
                rows={field.rows || 1}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: theme.palette.primary.main,
                  },
                }}
                InputProps={{
                  sx: { borderRadius: 1.5 },
                }}
              />
            )}
          />
        );

      case "date":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value, ref } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={trLocale}
              >
                <DatePicker
                  label={field.label}
                  inputRef={ref}
                  value={value ? new Date(value) : null}
                  onChange={onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors[field.name],
                      helperText: errors[field.name]?.message,
                      sx: {
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main,
                            borderWidth: "2px",
                          },
                        },
                      },
                    },
                  }}
                  disabled={field.disabled}
                />
              </LocalizationProvider>
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value, ref } }) => (
              <FormControl
                fullWidth
                error={!!errors[field.name]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                  },
                }}
              >
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={value || ""}
                  onChange={onChange}
                  label={field.label}
                  inputRef={ref}
                  disabled={field.disabled}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors[field.name] && (
                  <Typography variant="caption" color="error">
                    {errors[field.name].message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      id="profile-edit-form"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.15)",
          }}
        >
          <AlertTitle>{t("error")}</AlertTitle>
          {error}
        </Alert>
      )}

      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "visible",
        }}
      >
        <CardContent
          sx={{
            p: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Tooltip title={t("uploadNewPhoto")}>
                  <IconButton
                    aria-label={t("uploadNewPhoto")}
                    component="label"
                    onChange={handleAvatarChange}
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      width: 36,
                      height: 36,
                      "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <PhotoCamera fontSize="small" />
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </IconButton>
                </Tooltip>
              }
            >
              <Avatar
                src={avatar}
                alt={profile?.firstName}
                sx={{
                  width: 120,
                  height: 120,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  border: "4px solid white",
                  transition: "opacity 0.3s ease",
                  opacity: imageHover ? 0.85 : 1,
                }}
              />
            </StyledBadge>

            <Box
              sx={{
                mt: 1,
                textAlign: "center",
                maxWidth: 180,
              }}
            >
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Info fontSize="inherit" />
                {t("profilePhotoTip")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, width: { xs: "100%", sm: "auto" } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.primary,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {t("personalDetails")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              {fields.slice(0, 2).map((field, index) => (
                <Box key={index} sx={{ flexGrow: 1, width: "100%" }}>
                  {renderField(field)}
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 600,
            mb: 2,
          }}
        >
          {t("accountInformation")}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {fields.slice(2).map((field, index) => (
            <Grid item xs={12} sm={field.gridSize || 6} key={`detail-${index}`}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isDirty && (
            <Alert
              icon={<Info fontSize="inherit" />}
              severity="info"
              sx={{
                py: 0,
                px: 1,
                "& .MuiAlert-message": {
                  p: "4px 0",
                  fontSize: "0.875rem",
                },
              }}
            >
              {t("unsavedChanges")}
            </Alert>
          )}
        </Box>

        {/* <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => reset(profile)}
            disabled={!isDirty}
          >
            {t("reset")}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
            disabled={!isDirty || !isValid}
            loadingPosition="start"
            startIcon={<Check />}
            sx={{
              minWidth: 120,
              boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 10px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            {t("save")}
          </LoadingButton>
        </Box> */}
      </Box>
    </Box>
  );
};

export default ProfileEditForm;
