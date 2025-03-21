import React from "react";
import { Routes, Route } from "react-router-dom";
import PsychologistHome from "../psychologist/PsychologistHome";
import Patients from "../psychologist/Patients";
import AppointmentCalendar from "../psychologist/AppointmentCalendar";
import PatientNotes from "../psychologist/PatientNotes";
import PsychologistProfile from "../psychologist/PsychologistProfile";

const PsychologistDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<PsychologistHome />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/appointments" element={<AppointmentCalendar />} />
      <Route path="/patient-notes" element={<PatientNotes />} />
      <Route path="/profile" element={<PsychologistProfile />} />
    </Routes>
  );
};

export default PsychologistDashboard;
