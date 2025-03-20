import { Box, Container, Paper } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";

const AuthLayout = ({ children }) => {
  const { isMobile, calculatePadding } = useResponsive();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: calculatePadding("md"),
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
