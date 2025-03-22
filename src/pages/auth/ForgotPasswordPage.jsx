import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { forgotPassword } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      setSubmitted(true);
    } catch (err) {
      // Error already handled in Redux
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        maxWidth: 450,
        mx: "auto",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t("digitalTherapyAssistant")}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {t("resetPassword")}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {t("enterYourEmailToResetPassword")}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {submitted ? (
          <Box sx={{ textAlign: "center" }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              {t("passwordResetEmailSent")}
            </Alert>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ mt: 2 }}
            >
              {t("backToLogin")}
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: t("emailIsRequired"),
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t("invalidEmailFormat"),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("email")}
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : t("sendResetLink")}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                {t("didYouRememberYourPassword")}{" "}
                <MuiLink
                  component={Link}
                  to="/login"
                  underline="hover"
                  sx={{ cursor: "pointer" }}
                >
                  {t("login")}
                </MuiLink>
              </Typography>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
