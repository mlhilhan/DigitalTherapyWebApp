import React from "react";
import { Routes, Route } from "react-router-dom";
import Analytics from "../institution/Analytics";
import PsychologistManagement from "../institution/PsychologistManagement";
import InstitutionProfile from "../institution/InstitutionProfile";
import InstitutionHome from "../institution/InstitutionHome";
import PatientManagement from "../institution/PatientManagement";
import AppointmentOverview from "../institution/AppointmentOverview";

const InstitutionDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<InstitutionHome />} />
      <Route path="/psychologists" element={<PsychologistManagement />} />
      <Route path="/patients" element={<PatientManagement />} />
      <Route path="/appointments" element={<AppointmentOverview />} />
      <Route path="/profile" element={<InstitutionProfile />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default InstitutionDashboard;
