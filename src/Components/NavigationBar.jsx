// src/Components/NavigationBar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaDatabase,
  FaUpload,
  FaUserCircle,
  FaCalendarCheck,
  FaHourglassHalf,
  FaSignOutAlt,
} from 'react-icons/fa';

const links = {
  "Team Leader": [
    { name:"Dashboard", path: "/tl", icon:<FaDatabase/> },
    { name: "All Data", path: "/tl/alldata", icon: <FaDatabase /> },
    { name: "Upload Excel", path: "/tl/upload", icon: <FaUpload /> },
    { name: "Profile", path: "/tl/profile", icon: <FaUserCircle /> },
  ],
  "Telecaller": [
    { name: "Dashboard", path: "/telecom", icon: <FaDatabase /> },
    { name: "Profile", path: "/telecom/profile", icon: <FaUserCircle /> },
    { name: "Today Data", path: "/telecom/today", icon: <FaCalendarCheck /> },
    // { name: "Pending Data", path: "/telecom/pending", icon: <FaHourglassHalf /> },
  ],
  "Sales Person": [
    { name: "Dashboard", path: "/sales", icon: <FaDatabase /> },
    { name: "Profile", path: "/sales/profile", icon: <FaUserCircle /> },
    { name: "Today Data", path: "/sales/today", icon: <FaCalendarCheck /> },
    // { name: "Pending Meeting", path: "/sales/pending", icon: <FaHourglassHalf /> },
  ],
};

const NavigationBar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth info here if needed (localStorage/session/etc)
    navigate('/');
  };

  return (
    <div className="w-60 h-screen bg-gray-800 text-white flex flex-col justify-between fixed">
      <div>
        <div className="p-4 text-xl font-bold border-b border-gray-700">CRM Dashboard</div>
        <nav className="mt-4 flex flex-col gap-2 px-4">
          {links[role]?.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-600 bg-red-500 text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
