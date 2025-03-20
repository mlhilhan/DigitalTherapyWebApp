// src/pages/auth/RegisterPage.jsx
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

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

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
    },
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...registerData } = data;

      const resultAction = await dispatch(registerUser(registerData));

      if (!resultAction.error) {
        setSuccessMessage("Kayıt başarılı! Giriş yapılıyor...");
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
          Dijital Terapi Asistanı
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Yeni hesap oluşturun
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Başarı toast mesajı */}
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

      {/* Form içeriği... */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form alanları... */}
        <Controller
          name="username"
          control={control}
          rules={{
            required: "Kullanıcı adı gerekli",
            minLength: {
              value: 3,
              message: "Kullanıcı adı en az 3 karakter olmalı",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Kullanıcı Adı"
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
            required: "E-posta gerekli",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Geçerli bir e-posta adresi girin",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="E-posta"
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
            required: "Şifre gerekli",
            minLength: {
              value: 6,
              message: "Şifre en az 6 karakter olmalı",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Şifre"
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
            required: "Şifre tekrarı gerekli",
            validate: (val) => {
              if (watch("password") !== val) {
                return "Şifreler eşleşmiyor";
              }
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Şifre Tekrarı"
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
          {isLoading ? <CircularProgress size={24} /> : "Kayıt Ol"}
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            Zaten hesabınız var mı?{" "}
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              Giriş yap
            </MuiLink>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterPage;
