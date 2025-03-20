import { createTheme } from "@mui/material/styles";
import { colors, typography, spacing } from "./colors";

const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    background: colors.background,
    text: colors.text,
  },
  typography,
  spacing: (factor) => `${spacing.sm * factor}px`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: spacing.xs,
          textTransform: "none",
          padding: `${spacing.sm}px ${spacing.md}px`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: spacing.sm,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
