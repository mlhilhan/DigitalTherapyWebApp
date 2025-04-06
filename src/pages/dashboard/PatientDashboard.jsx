import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientHome from "../patient/PatientHome";
import MoodJournal from "../patient/MoodJournal";
import TherapyChat from "../patient/TherapyChat";
import Appointments from "../patient/Appointments";
import PatientProfile from "../patient/PatientProfile";
import SubscriptionPlans from "../patient/SubscriptionPlans";
import DailyTips from "../patient/DailyTips";

const PatientDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />
      <Route path="/mood-journal" element={<MoodJournal />} />
      <Route path="/therapy-chat" element={<TherapyChat />} />
      <Route path="/subscription-plans" element={<SubscriptionPlans />} />
      <Route path="/daily-tips" element={<DailyTips />} />
      {/* <Route path="/appointments" element={<Appointments />} /> */}
      <Route path="/profile" element={<PatientProfile />} />
    </Routes>
  );
};

export default PatientDashboard;
