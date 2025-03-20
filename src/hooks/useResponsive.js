import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useResponsive() {
  const theme = useTheme();

  return {
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isDesktop: useMediaQuery(theme.breakpoints.up("md")),
    isLargeScreen: useMediaQuery(theme.breakpoints.up("lg")),

    calculatePadding: (size = "md") => {
      if (useMediaQuery(theme.breakpoints.down("sm"))) {
        // Mobile
        switch (size) {
          case "sm":
            return theme.spacing(1);
          case "md":
            return theme.spacing(2);
          case "lg":
            return theme.spacing(3);
          default:
            return theme.spacing(2);
        }
      } else {
        // Tablet or Desktop
        switch (size) {
          case "sm":
            return theme.spacing(2);
          case "md":
            return theme.spacing(3);
          case "lg":
            return theme.spacing(4);
          default:
            return theme.spacing(3);
        }
      }
    },
  };
}
