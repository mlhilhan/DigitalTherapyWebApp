import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../admin/AdminHome";
import UserManagement from "../admin/UserManagement";
import InstitutionManagement from "../admin/InstitutionManagement";
import SystemSettings from "../admin/SystemSettings";
import AdminProfile from "../admin/AdminProfile";

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/institutions" element={<InstitutionManagement />} />
      <Route path="/settings" element={<SystemSettings />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
};

export default AdminDashboard;
