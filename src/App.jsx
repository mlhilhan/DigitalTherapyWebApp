import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import theme from "./theme";
import store from "./store";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "./i18n/i18n";
import { GetCurrentPatientProfile } from "./features/profile/profileSlice";
import roles from "./config/roles";

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    const initLanguage = async () => {
      if (isAuthenticated && profile?.preferredLanguage) {
        await i18n.changeLanguage(profile.preferredLanguage);
      }
    };
    initLanguage();
  }, [isAuthenticated, profile?.preferredLanguage]);

  useEffect(() => {
    if (isAuthenticated) {
      switch (user?.role?.roleId) {
        case roles.PATIENT:
          dispatch(GetCurrentPatientProfile());
          break;
        case roles.PSYCHOLOGIST:
          break;
        case roles.INSTITUTION:
          break;
        case roles.ADMIN:
          break;
        default:
      }
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
