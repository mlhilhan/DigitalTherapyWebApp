import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import trLocale from "date-fns/locale/tr";
import { useTranslation } from "react-i18next";
import { formatDateToISO } from "../../utils/dateUtils";

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
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: profile || {},
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
                  value={value || null}
                  onChange={onChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message}
                    />
                  )}
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
              <FormControl fullWidth error={!!errors[field.name]}>
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
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>{t("error")}</AlertTitle>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={avatar} />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="caption" color="textSecondary">
            {t("clickToChangeYourProfilePhoto")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={field.gridSize || 6} key={index}>
              {renderField(field)}
            </Grid>
          ))}

          <Grid
            item
            xs={12}
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              sx={{ minWidth: 120 }}
            >
              {t("save")}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProfileEditForm;
