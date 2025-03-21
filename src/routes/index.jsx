import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";
import PatientDashboard from "../pages/dashboard/PatientDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import InstitutionDashboard from "../pages/dashboard/InstitutionDashboard";
import PsychologistDashboard from "../pages/dashboard/PsychologistDashboard";

const ROLE_IDS = {
  PATIENT: "4b41d3bc-95cb-4758-8c01-c5487707931e",
  PSYCHOLOGIST: "40c2b39a-a133-4ba9-a97b-ce351bd101ac",
  ADMIN: "ce6c9f4d-8b26-4971-853a-69bafe48c012",
  INSTITUTION: "5e6ef66e-8298-4002-b765-5a794f149362",
};

const ProtectedRoute = ({ children, allowedROLE_IDS }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Kullanıcı giriş yapmamışsa
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Önemli: User null ise, hemen bir yönlendirme yapmayın
  if (!user) {
    // Kullanıcı bilgileri henüz yüklenmemiş, bekleyin
    return <div>Kullanıcı bilgileri yükleniyor...</div>;
  }

  // Rol kontrolü
  if (allowedROLE_IDS && !allowedROLE_IDS.includes(user?.role?.roleId)) {
    let dashboard = "/dashboard";

    switch (user?.role?.roleId) {
      case ROLE_IDS.PATIENT:
        dashboard = "/patient-dashboard";
        break;
      case ROLE_IDS.PSYCHOLOGIST:
        dashboard = "/psychologist-dashboard";
        break;
      case ROLE_IDS.ADMIN:
        dashboard = "/admin-dashboard";
        break;
      case ROLE_IDS.INSTITUTION:
        dashboard = "/institution-dashboard";
        break;
    }

    // Önemli: Yönlendirme döngüsünü önlemek için kontrol ekleyin
    if (location.pathname.startsWith(dashboard)) {
      console.warn("Yönlendirme döngüsü algılandı, mevcut sayfada kalınıyor");
      return <Layout>{children}</Layout>;
    }

    return <Navigate to={dashboard} replace />;
  }

  return <Layout>{children}</Layout>;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    let dashboard = "/dashboard";

    switch (user?.role?.roleId) {
      case ROLE_IDS.PATIENT:
        dashboard = "/patient-dashboard";
        break;
      case ROLE_IDS.PSYCHOLOGIST:
        dashboard = "/psychologist-dashboard";
        break;
      case ROLE_IDS.ADMIN:
        dashboard = "/admin-dashboard";
        break;
      case ROLE_IDS.INSTITUTION:
        dashboard = "/institution-dashboard";
        break;
    }

    return <Navigate to={dashboard} replace />;
  }

  return <AuthLayout>{children}</AuthLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute>
            <RegisterPage />
          </AuthRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthRoute>
            <ForgotPasswordPage />
          </AuthRoute>
        }
      />

      <Route
        path="/patient-dashboard/*"
        element={
          <ProtectedRoute allowedROLE_IDS={[ROLE_IDS.PATIENT]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/psychologist-dashboard/*"
        element={
          <ProtectedRoute allowedROLE_IDS={[ROLE_IDS.PSYCHOLOGIST]}>
            <PsychologistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard/*"
        element={
          <ProtectedRoute allowedROLE_IDS={[ROLE_IDS.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/institution-dashboard/*"
        element={
          <ProtectedRoute allowedROLE_IDS={[ROLE_IDS.INSTITUTION]}>
            <InstitutionDashboard />
          </ProtectedRoute>
        }
      />

      {/* Varsayılan yönlendirme */}
      <Route path="/" element={<Navigate to="/patient-dashboard" replace />} />
      <Route path="*" element={<Navigate to="/patient-dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
