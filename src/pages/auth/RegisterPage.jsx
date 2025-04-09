import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { getUserCountryFromBrowser } from "../../utils/countryUtils";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const userLanguage = i18n.language.split("-")[0]; // "en-EN" -> "en"
  const userCountry = getUserCountryFromBrowser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleId: "4b41d3bc-95cb-4758-8c01-c5487707931e", //patient
      preferredLanguage: userLanguage,
      country: userCountry,
    },
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...registerData } = data;

      const resultAction = await dispatch(registerUser(registerData));

      if (!resultAction.error) {
        setSuccessMessage(t("registrationSuccessfulLoggingIn"));
      }
    } catch (err) {}
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage("");
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("digitalTherapyAssistant")}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t("createNewAccount")}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: t("usernameIsRequired"),
            minLength: {
              value: 3,
              message: t("usernameMustBeThreeCharacters"),
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("username")}
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={isLoading}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: t("emailIsRequired"),
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: t("pleaseEnterValidEmail"),
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("email")}
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: t("passwordIsRequired"),
            minLength: {
              value: 6,
              message: t("passwordMustBeSixCharacters"),
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("password")}
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: t("againPasswordIsRequired"),
            validate: (val) => {
              if (watch("password") !== val) {
                var message = t("passwordsDoNotMatch");
                return message;
              }
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("againPassword")}
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
          {isLoading ? <CircularProgress size={24} /> : t("register")}
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            {t("doYouAlreadyHaveAnAccount")}{" "}
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
    </Box>
  );
};

export default RegisterPage;
