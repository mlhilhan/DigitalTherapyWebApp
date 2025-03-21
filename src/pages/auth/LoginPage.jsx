import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { loginUser } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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
      UsernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      // Error already handled in Redux
    }
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dijital Terapi Asistanı
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Hesabınıza giriş yapın
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="UsernameOrEmail"
          control={control}
          rules={{ required: "Kullanıcı adı gerekli" }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("username")}
              fullWidth
              margin="normal"
              error={!!errors.UsernameOrEmail}
              helperText={errors.UsernameOrEmail?.message}
              disabled={isLoading}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Şifre gerekli" }}
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

        <Box sx={{ mt: 2, textAlign: "right" }}>
          <MuiLink
            component={Link}
            to="/forgot-password"
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            Şifremi unuttum
          </MuiLink>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Giriş Yap"}
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            Hesabınız yok mu?{" "}
            <MuiLink
              component={Link}
              to="/register"
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              Kayıt ol
            </MuiLink>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
