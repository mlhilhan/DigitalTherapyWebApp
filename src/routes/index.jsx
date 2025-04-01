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
import roles from "../config/roles";

const ProtectedRoute = ({ children, allowedROLE_IDS }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <div>Kullanıcı bilgileri yükleniyor...</div>;
  }

  // Rol kontrolü
  if (allowedROLE_IDS && !allowedROLE_IDS.includes(user?.role?.roleId)) {
    let dashboard = "/dashboard";

    switch (user?.role?.roleId) {
      case roles.PATIENT:
        dashboard = "/patient-dashboard";
        break;
      case roles.PSYCHOLOGIST:
        dashboard = "/psychologist-dashboard";
        break;
      case roles.ADMIN:
        dashboard = "/admin-dashboard";
        break;
      case roles.INSTITUTION:
        dashboard = "/institution-dashboard";
        break;
    }

    if (location.pathname.startsWith(dashboard)) {
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
      case roles.PATIENT:
        dashboard = "/patient-dashboard";
        break;
      case roles.PSYCHOLOGIST:
        dashboard = "/psychologist-dashboard";
        break;
      case roles.ADMIN:
        dashboard = "/admin-dashboard";
        break;
      case roles.INSTITUTION:
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
          <ProtectedRoute allowedROLE_IDS={[roles.PATIENT]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/psychologist-dashboard/*"
        element={
          <ProtectedRoute allowedROLE_IDS={[roles.PSYCHOLOGIST]}>
            <PsychologistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard/*"
        element={
          <ProtectedRoute allowedROLE_IDS={[roles.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/institution-dashboard/*"
        element={
          <ProtectedRoute allowedROLE_IDS={[roles.INSTITUTION]}>
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
