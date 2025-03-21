import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import PatientHome from "../patient/PatientHome";
import MoodJournal from "../patient/MoodJournal";
import TherapyChat from "../patient/TherapyChat";
import Appointments from "../patient/Appointments";
import Profile from "../patient/Profile";

const PatientDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />
      <Route path="/mood-journal" element={<MoodJournal />} />
      <Route path="/therapy-chat" element={<TherapyChat />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default PatientDashboard;
