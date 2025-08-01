import React from 'react';
import Data from '../../DataStore/Telecom/teleprofile.json';
import {
  FaPhoneAlt,
  FaUserCheck,
  FaHeadset,
  FaUserTie,
  FaRegCalendarAlt,
  FaChartLine,
} from 'react-icons/fa';

const TELECOMdash = () => {
  const emp = Data.telecom_employee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">📊 Telecom Employee Dashboard</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Metric Cards */}
        <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
          <FaPhoneAlt className="text-blue-500 text-3xl mx-auto mb-2" />
          <p className="text-2xl font-bold">{emp.calls_handled_today}</p>
          <p className="text-gray-600">Calls Handled Today</p>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
          <FaChartLine className="text-green-500 text-3xl mx-auto mb-2" />
          <p className="text-2xl font-bold">{emp.total_calls_handled}</p>
          <p className="text-gray-600">Total Calls Handled</p>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
          <FaRegCalendarAlt className="text-purple-500 text-3xl mx-auto mb-2" />
          <p className="text-2xl font-bold">{emp.expected_calls_today}</p>
          <p className="text-gray-600">Expected Calls Today</p>
        </div>
      </div>

      {/* Employee Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={emp.profile_image}
            alt={emp.name}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaUserTie className="text-blue-600" />
              {emp.name}
            </h2>
            <p className="text-gray-500">{emp.designation}</p>
            <p className="text-sm text-gray-400">Emp ID: {emp.employee_id} | Operator: {emp.assigned_operator}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-700">
          <div>
            <p><strong>Phone:</strong> {emp.phone}</p>
            <p><strong>Email:</strong> {emp.email}</p>
            <p><strong>Shift:</strong> {emp.shift}</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-medium">{emp.current_status}</span></p>
          </div>
          <div>
            <p><strong>Experience:</strong> {emp.experience_years} years</p>
            <p><strong>Joining Date:</strong> {emp.joining_date}</p>
            <p><strong>Location:</strong> {emp.address}</p>
          </div>
        </div>
      </div>

      {/* Performance & Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {/* Performance */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaHeadset className="text-yellow-500" />
            Call Performance
          </h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Avg. Call Duration:</strong> {emp.performance.average_call_duration_minutes} mins</li>
            <li><strong>First Call Resolution:</strong> {emp.performance.first_call_resolution_rate}%</li>
            <li><strong>Positive Feedback:</strong> {emp.performance.positive_feedback_percentage}%</li>
            <li><strong>Escalation Rate:</strong> {emp.performance.escalation_rate}%</li>
          </ul>
        </div>

        {/* Schedule */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaRegCalendarAlt className="text-pink-500" />
            Upcoming Call Schedule
          </h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            {emp.future_schedule.map((schedule, idx) => (
              <li key={idx}>
                <strong>{schedule.date}:</strong> {schedule.expected_calls} calls
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Supervisor Section */}
      <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-xl shadow-inner p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Supervisor</h3>
        <p><strong>Name:</strong> {emp.supervisor.name}</p>
        <p><strong>Email:</strong> {emp.supervisor.email}</p>
        <p><strong>Phone:</strong> {emp.supervisor.phone}</p>
      </div>
    </div>
  );
};

export default TELECOMdash;
