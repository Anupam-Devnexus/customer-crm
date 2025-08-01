// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import './App.css';

// Dashboards
import TLDash from './Pages/TL/TLdash';
import TELECOMdash from './Pages/TeleCom/TELECOMdash';
import SALESDash from './Pages/Sales/SALEdash';

// TLPAges
import UploadData from './Pages/TL/UploadData';
import TLProfile from './Pages/TL/TLProfile';
import TLALLdata from './Pages/TL/TLALLdata';


// Sales Pages
import SalesProfile from './Pages/Sales/SALESprofile';
import Salestoday from "./Pages/Sales/SALEStoday";


// Telecom Pages
import TelecomProfile from './Pages/TeleCom/TELEProfile';
import TELEtoday from './Pages/TeleCom/TELEtoday';
import TelePending from "./Pages/TeleCom/TELEPEnding"

// Auth
import Login from './Auth/Login';

// Role-based layout wrapper to show NavigationBar
const DashboardLayout = ({ children, role }) => (
  <div className="flex">
    <NavigationBar role={role} />
    <div className="ml-60 w-full p-4">{children}</div>
  </div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* TL Routes */}
      <Route
        path="/tl"
        element={
          <DashboardLayout role="Team Leader">
            <TLDash />
          </DashboardLayout>
        }
      />
      <Route
        path="/tl/upload"
        element={
          <DashboardLayout role="Team Leader">
            <UploadData />
          </DashboardLayout>
        }
      />
      <Route
        path="/tl/profile"
        element={
          <DashboardLayout role="Team Leader">
            <TLProfile />
          </DashboardLayout>
        }
      />
      {/* Placeholder route if you plan to add All Data */}
      <Route
        path="/tl/alldata"
        element={
          <DashboardLayout role="Team Leader">
            <TLALLdata />
          </DashboardLayout>
        }
      />

      {/* Telecom Routes */}
      <Route
        path="/telecom"
        element={
          <DashboardLayout role="Telecaller">
            <TELECOMdash />
          </DashboardLayout>
        }
      />
      <Route
        path="/telecom/profile"
        element={
          <DashboardLayout role="Telecaller">
            <TelecomProfile />
          </DashboardLayout>
        }
      />
      <Route
        path="/telecom/today"
        element={
          <DashboardLayout role="Telecaller">
            <TELEtoday />
          </DashboardLayout>
        }
      />
      <Route
        path="/telecom/pending"
        element={
          <DashboardLayout role="Telecaller">
            <TelePending />
          </DashboardLayout>
        }
      />

      {/* Sales Routes */}
      <Route
        path="/sales"
        element={
          <DashboardLayout role="Sales Person">
            <SALESDash />
          </DashboardLayout>
        }
      />
      <Route
        path="/sales/profile"
        element={
          <DashboardLayout role="Sales Person">
            <SalesProfile />
          </DashboardLayout>
        }
      />
      <Route
        path="/sales/today"
        element={
          <DashboardLayout role="Sales Person">
            <Salestoday />
          </DashboardLayout>
        }
      />
      <Route
        path="/sales/pending"
        element={
          <DashboardLayout role="Sales Person">
            {/* <SalesPending /> */}
          </DashboardLayout>
        }
      />
    </Routes>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
